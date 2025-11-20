const axios = require('axios');

exports.handler = async (event, context) => {
    // CORS headers for all responses
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { image } = JSON.parse(event.body);
        if (!image) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Image is required' })
            };
        }

        const API_KEY = process.env.PERFECT_KEY;
        const API_SECRET = process.env.PERFECT_SECRET;

        if (!API_KEY || !API_SECRET) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Server configuration error: Missing credentials' })
            };
        }

        // Step A: Auth
        console.log('Authenticating...');
        const authResponse = await axios.post('https://api.perfectcorp.com/v2/auth', {
            key: API_KEY,
            secret: API_SECRET
        });
        const { token } = authResponse.data;

        // Step B: Upload
        console.log('Uploading image...');
        const uploadResponse = await axios.post(
            'https://api.perfectcorp.com/v2/file/upload',
            { file: image, type: 'image' },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { fileId } = uploadResponse.data;

        // Step C: Start Task
        console.log('Starting analysis task...');
        const taskResponse = await axios.post(
            'https://api.perfectcorp.com/v2/task/skin-analysis',
            { fileId },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const { taskId } = taskResponse.data;

        // Step D: Poll
        console.log(`Polling task ${taskId}...`);
        let status = 'pending';
        let result = null;
        const startTime = Date.now();
        const TIMEOUT_MS = 9000;

        while (status !== 'completed' && status !== 'failed') {
            if (Date.now() - startTime > TIMEOUT_MS) {
                return {
                    statusCode: 504,
                    headers,
                    body: JSON.stringify({ error: 'Analysis timed out', taskId })
                };
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const pollResponse = await axios.get(
                `https://api.perfectcorp.com/v2/task/${taskId}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            status = pollResponse.data.status;

            if (status === 'completed') {
                result = pollResponse.data.result;
            } else if (status === 'failed') {
                throw new Error('Analysis task failed on server');
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result),
        };

    } catch (error) {
        console.error('Skin Analysis Error:', error.message);
        console.error('Error details:', error.response?.data || error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message,
                details: error.response?.data?.message || 'Unknown error'
            }),
        };
    }
};
