export async function chatStream(messages, onChunk, systemPrompt = '') {
  const baseUrl = import.meta.env.VITE_ANTHROPIC_BASE_URL;
  const token = import.meta.env.VITE_ANTHROPIC_AUTH_TOKEN;

  try {
    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token,
        'anthropic-version': '2023-06-01',
        'dangerously-allow-the-developer-to-expose-their-api-key-if-they-want-to': 'true'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let content = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content_block_delta' && data.delta?.text) {
              const text = data.delta.text;
              content += text;
              onChunk(content);
            }
          } catch (e) {
            // Skip non-JSON or partial lines
          }
        }
      }
    }
    return content;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
}
