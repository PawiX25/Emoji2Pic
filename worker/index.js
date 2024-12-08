export default {
    async fetch(request, env) {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
  
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      };
  
      if (request.method === 'GET') {
        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Emoji2Pic API</title>
            </head>
            <body style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
              <h1>✨ Emoji2Pic API</h1>
              <p>This is an API endpoint. Please use the <a href="https://emoji2pic.pawix.dev/">main website</a> to generate images.</p>
              <p>Example POST request:</p>
              <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
  fetch('${request.url}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emojis: '🐈' })
  });</pre>
            </body>
          </html>
        `, {
          headers: { 
            ...corsHeaders,
            'Content-Type': 'text/html;charset=UTF-8'
          },
        });
      }
  
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { 
          status: 405,
          headers: corsHeaders
        });
      }
  
      try {
        const { emojis } = await request.json();
        
        if (!emojis) {
          return new Response('No emoji provided', { status: 400 });
        }
  
        const response = await env.AI.run(
          '@cf/stabilityai/stable-diffusion-xl-base-1.0',
          { prompt: emojis }
        );
  
        return new Response(response, {
          headers: {
            ...corsHeaders,
            'content-type': 'image/png',
          },
        });
      } catch (error) {
        return new Response(error.message, { 
          status: 500,
          headers: corsHeaders
        });
      }
    },
  };
  