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
      max_tokens: 100,
    });

    console.log("=== RESPUESTA COMPLETA OPENAI ===");
    console.log(JSON.stringify(completion, null, 2));

    const reply =
      completion?.choices?.[0]?.message?.content || "Sin respuesta";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("ERROR EN API:", error);
    return res.status(500).json({ error: "Error procesando la consulta." });
  }
};


