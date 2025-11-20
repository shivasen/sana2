// netlify/functions/skin-analysis.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { image } = JSON.parse(event.body);
  if (!image) {
    return { statusCode: 400, body: JSON.stringify({ error: "Image is required" }) };
  }
  const API_KEY = process.env.PERFECT_KEY;
  const API_SECRET = process.env.PERFECT_SECRET;
  if (!API_KEY || !API_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error: Missing credentials" }) };
  }
  try {
    console.log("Authenticating...");
    const authResponse = await fetch("https://api.perfectcorp.com/v2/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: API_KEY, secret: API_SECRET })
    });
    if (!authResponse.ok) throw new Error(`Auth failed: ${authResponse.statusText}`);
    const { token } = await authResponse.json();
    console.log("Uploading image...");
    const uploadResponse = await fetch("https://api.perfectcorp.com/v2/file/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ file: image, type: "image" })
      // Assuming API accepts base64 in 'file' field
    });
    if (!uploadResponse.ok) throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    const { fileId } = await uploadResponse.json();
    console.log("Starting analysis task...");
    const taskResponse = await fetch("https://api.perfectcorp.com/v2/task/skin-analysis", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fileId })
    });
    if (!taskResponse.ok) throw new Error(`Task start failed: ${taskResponse.statusText}`);
    const { taskId } = await taskResponse.json();
    console.log(`Polling task ${taskId}...`);
    let status = "pending";
    let result = null;
    const startTime = Date.now();
    const TIMEOUT_MS = 9e3;
    while (status !== "completed" && status !== "failed") {
      if (Date.now() - startTime > TIMEOUT_MS) {
        return { statusCode: 504, body: JSON.stringify({ error: "Analysis timed out", taskId }) };
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const pollResponse = await fetch(`https://api.perfectcorp.com/v2/task/${taskId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!pollResponse.ok) throw new Error(`Polling failed: ${pollResponse.statusText}`);
      const pollData = await pollResponse.json();
      status = pollData.status;
      if (status === "completed") {
        result = pollData.result;
      } else if (status === "failed") {
        throw new Error("Analysis task failed on server");
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error("Skin Analysis Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
//# sourceMappingURL=skin-analysis.js.map
