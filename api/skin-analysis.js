import axios from 'axios';

export default async function handler(req, res) {
    // CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const API_KEY = process.env.PERFECT_KEY;

        if (!API_KEY) {
            return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
        }

        // V2 API uses API Key directly as Bearer token (no RSA encryption needed!)
        const headers = {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        };

        // Step 1: Upload Image (V2 API)
        console.log('Uploading image to V2 API...');
        const uploadUrl = 'https://yce-api-01.perfectcorp.com/s2s/v2.0/file/skin-analysis';
        console.log(`POST ${uploadUrl}`);

        const uploadResponse = await axios.post(
            uploadUrl,
            {
                files: [{
                    file_name: 'skin-analysis.jpg',
                    file_size: Math.ceil(image.length * 0.75), // Approximate base64 to bytes
                    content_type: 'image/jpeg'
                }]
            },
            { headers }
        );

        const fileId = uploadResponse.data.result?.files?.[0]?.file_id;
        const uploadPresignedUrl = uploadResponse.data.result?.files?.[0]?.url;

        if (!fileId || !uploadPresignedUrl) {
            throw new Error('Failed to get upload URL from API');
        }

        console.log(`Upload URL received, fileId: ${fileId}`);

        // Step 2: Upload actual file to presigned URL
        const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        await axios.put(uploadPresignedUrl, imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': imageBuffer.length
            }
        });
        console.log('Image uploaded successfully');

        // Step 3: Start Analysis Task (V2 API)
        console.log('Starting skin analysis task...');
        const taskUrl = 'https://yce-api-01.perfectcorp.com/s2s/v2.0/task/skin-analysis';
        console.log(`POST ${taskUrl}`);

        const taskResponse = await axios.post(
            taskUrl,
            {
                request_id: 1,
                payload: {
                    file_sets: {
                        src_ids: [fileId]
                    },
                    actions: [
                        { id: 0 }, // wrinkle
                        { id: 1 }, // droopy_upper_eyelid
                        { id: 2 }, // droopy_lower_eyelid
                        { id: 3 }, // firmness
                        { id: 4 }, // acne
                        { id: 5 }, // moisture
                        { id: 6 }, // eye_bag
                        { id: 7 }, // dark_circle_v2
                        { id: 8 }, // age_spot
                        { id: 9 }, // radiance
                        { id: 10 }, // redness
                        { id: 11 }, // oiliness
                        { id: 12 }, // pore
                        { id: 13 }  // texture
                    ]
                }
            },
            { headers }
        );

        const taskId = taskResponse.data.result?.task_id;
        if (!taskId) {
            throw new Error('Failed to get task ID from API');
        }
        console.log(`Task started, taskId: ${taskId}`);

        // Step 4: Poll for Results (V2 API)
        console.log(`Polling task ${taskId}...`);
        let status = 'running';
        let result = null;
        const startTime = Date.now();
        const TIMEOUT_MS = 30000; // 30 seconds timeout

        while (status === 'running') {
            if (Date.now() - startTime > TIMEOUT_MS) {
                return res.status(504).json({ error: 'Analysis timed out', taskId });
            }

            await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds

            const pollUrl = `https://yce-api-01.perfectcorp.com/s2s/v2.0/task/skin-analysis?task_id=${encodeURIComponent(taskId)}`;
            console.log(`GET ${pollUrl}`);

            const pollResponse = await axios.get(pollUrl, { headers });

            status = pollResponse.data.result?.status;
            console.log(`Poll status: ${status}`);

            if (status === 'success') {
                result = pollResponse.data.result;
                break;
            } else if (status === 'error') {
                const errorCode = pollResponse.data.result?.error_code || 'unknown';
                const errorMsg = pollResponse.data.result?.error || 'Analysis failed';
                throw new Error(`Analysis failed: ${errorCode} - ${errorMsg}`);
            }
        }

        // Return successful result
        return res.status(200).json({
            success: true,
            taskId,
            result
        });

    } catch (error) {
        console.error('Skin Analysis Error:', error);

        // Enhanced error logging
        const errorDetails = {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
            method: error.config?.method
        };

        console.error('Error Details:', JSON.stringify(errorDetails, null, 2));

        // Return detailed error to frontend
        return res.status(error.response?.status || 500).json({
            error: `API Error at ${errorDetails.url}: ${errorDetails.status} - ${error.message}`,
            details: errorDetails
        });
    }
}
