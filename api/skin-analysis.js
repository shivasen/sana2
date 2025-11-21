import axios from 'axios';
import crypto from 'crypto';

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
        const API_SECRET = process.env.PERFECT_SECRET;

        if (!API_KEY || !API_SECRET) {
            return res.status(500).json({ error: 'Server configuration error: Missing credentials' });
        }

        // Step A: Generate Token Locally (RSA Encryption)
        console.log('Generating Auth Token locally...');

        // Format the secret as a PEM Public Key
        // The env var is likely the raw key string, we need to wrap it
        const formattedKey = API_SECRET.replace(/\\n/g, '\n'); // Handle escaped newlines if present
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${formattedKey.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`;

        const timestamp = Date.now();
        const payload = `client_id=${API_KEY}&timestamp=${timestamp}`;

        const buffer = Buffer.from(payload, 'utf8');
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            buffer
        );

        const token = encrypted.toString('base64');
        console.log('Token generated successfully');

        // Step B: Upload
        console.log('Uploading image...');
        const uploadUrl = 'https://yce-api-01.perfectcorp.com/s2s/v1.0/file/upload';
        console.log(`POST ${uploadUrl}`);
        const uploadResponse = await axios.post(
            uploadUrl,
            { file: image, type: 'image' },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { fileId } = uploadResponse.data;
        console.log(`Upload successful, fileId: ${fileId}`);

        // Step C: Start Task
        console.log('Starting analysis task...');
        const taskUrl = 'https://yce-api-01.perfectcorp.com/s2s/v1.0/task/skin-analysis';
        console.log(`POST ${taskUrl}`);
        const taskResponse = await axios.post(
            taskUrl,
            { fileId },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { taskId } = taskResponse.data;
        console.log(`Task started, taskId: ${taskId}`);

        // Step D: Poll
        console.log(`Polling task ${taskId}...`);
        let status = 'pending';
        let result = null;
        const startTime = Date.now();
        const TIMEOUT_MS = 20000; // Increased timeout to 20s

        while (status !== 'completed' && status !== 'failed') {
            if (Date.now() - startTime > TIMEOUT_MS) {
                return res.status(504).json({ error: 'Analysis timed out', taskId });
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const pollUrl = `https://yce-api-01.perfectcorp.com/s2s/v1.0/task/${taskId}`;
            console.log(`GET ${pollUrl}`);
            const pollResponse = await axios.get(
                pollUrl,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            status = pollResponse.data.status;
            console.log(`Poll status: ${status}`);

            if (status === 'completed') {
                result = pollResponse.data.result;
            } else if (status === 'failed') {
                throw new Error('Analysis task failed on server');
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error('Skin Analysis Error:', error.message);
        const errorDetails = {
            error: error.message,
            failedUrl: error.config?.url,
            failedMethod: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        };

        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', JSON.stringify(error.response.data));
        }

        return res.status(500).json(errorDetails);
    }
}
