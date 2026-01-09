export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { drug, labelText } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key");
    }

    // OpenAI call here...

    return res.status(200).json({
      summary: summaryText
    });

  } catch (error) {
    console.error("API ERROR:", error);

    // 🚨 THIS IS THE MOST IMPORTANT LINE 🚨
    return res.status(500).json({
      error: error.message
    });
  }
}


