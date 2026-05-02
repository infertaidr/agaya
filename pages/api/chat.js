export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  try {
    // messages 형식 변환 (Claude → Gemma)
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-27b-it:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: system }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    const data = await response.json();
    console.log('API response status:', response.status);
    console.log('API response:', JSON.stringify(data));

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'API error' });
    }

    res.status(200).json({ content: data.candidates[0].content.parts[0].text });

  } catch (error) {
    console.log('Fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
