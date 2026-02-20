const OpenAI = require("openai");

module.exports = async function handler(req, res) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Decime hola",
        },
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error" });
  }
};


