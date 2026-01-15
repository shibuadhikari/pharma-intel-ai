export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { drug } = req.body;

    if (!drug) {
      return res.status(400).json({ error: "Drug name is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a pharmaceutical expert. Summarize FDA drug indications in clear, plain English for educational purposes.",
          },
          {
            role: "user",
            content: `Explain the drug ${drug} in simple terms.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({ error: "OpenAI response invalid", data });
    }

    res.status(200).json({
      summary: data.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




