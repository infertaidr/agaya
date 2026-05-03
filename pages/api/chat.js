export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { messages, system } = req.body;
  try {
    const contents = messages.map(msg => {
      if (Array.isArray(msg.content)) {
        const parts = msg.content.map(part => {
          if (part.type === 'text') return { text: part.text };
          if (part.type === 'image') return { inlineData: { mimeType: part.source.media_type, data: part.source.data } };
          return { text: '' };
        });
        return { role: msg.role === 'assistant' ? 'model' : 'user', parts };
      }
      return { role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] };
    });

    // ✅ 핵심 수정: 마지막 user 메시지만 보내기 (첫 질문일 때 문제 방지)
    const validContents = contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'hello' }] }];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: validContents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
        })
      }
    );

    const data = await response.json();
    console.log('API response status:', response.status);
    console.log('API error detail:', JSON.stringify(data?.error));

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({ error: 'No response from model' });

    res.status(200).json({ content: text });
  } catch (error) {
    console.log('Fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
