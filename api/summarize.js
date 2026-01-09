import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { labelText } = req.body;

    if (!labelText) {
      return res.status(400).json({ error: "No label text provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Summarize this drug label in simple English for educational purposes." },
        { role: "user", content: labelText },
      ],
    });

    const summary = completion.choices[0].message.content;

    res.status(200).json({ summary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
}

