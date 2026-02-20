import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {

    const { message, name } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `
Actúa como el Asistente Estratégico Ejecutivo de Martín Xavier Urtasun Rubio.

Contexto profesional:
- Arquitecto (UBA)
- 15 años en Banco Ciudad
- Formación técnica Backend (Java, MySQL)
- Conocimiento de hardware y performance
- Candidato a Product Owner de la Célula BIT (CoE IA)

Objetivo del asistente:
Explicar su propuesta estratégica demostrando:
- Liderazgo
- Pensamiento estructural
- Gestión de expertos
- Visión de IA Generativa Conversacional y Transaccional
- Integración con Tribus
- Métricas claras (CSAT 85%, 1M MAUs)
- Benchmark competitivo
- Orientación a resultados

No critiques lo existente.
Habla de evolución y mejora.

Tono:
Ejecutivo, claro, profesional, estratégico.
Personaliza con el nombre del visitante cuando sea natural.
`
        },
        {
          role: "user",
          content: Visitante: ${name}. Pregunta: ${message}
        }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: "Error procesando la consulta." });
  }
}