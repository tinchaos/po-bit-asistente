const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  try {
    const { message, name } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Sos el Asistente Estratégico Ejecutivo de Martín Xavier Urtasun Rubio. Respondé de forma clara, estratégica y profesional.",
        },
        {
          role: "user",
          content: Visitante: ${name}\nPregunta: ${message},
        },
      ],
      max_tokens: 500,
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("ERROR OPENAI:", error);
    res.status(500).json({ error: "Error procesando la consulta." });
  }
};
