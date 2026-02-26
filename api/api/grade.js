import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { headline, realHeadlines } = req.body;

  const prompt = `
You are a professional newspaper editor.

Score this headline 1-100 for:
- Catchiness
- Clarity
- Emotional impact
- Virality
- Brevity

Compare against:
${realHeadlines.join("\n")}

Return ONLY JSON:
{
  "score": number,
  "feedback": "string",
  "originality": "Original or Too Similar"
}

Headline: "${headline}"
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const result = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: "AI grading failed" });
  }
}
