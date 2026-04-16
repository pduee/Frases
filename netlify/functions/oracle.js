/* ═══════════════════════════════════════════════════
   Netlify Function: oracle
   Proxy seguro para la API de Anthropic.
   Variable de entorno requerida: ANTHROPIC_API_KEY
═══════════════════════════════════════════════════ */

'use strict';

const https = require('https');

// ── Prompt del sistema ───────────────────────────

const SYSTEM = `Eres el Oráculo, un sistema que canaliza la sabiduría de los grandes \
consejeros, filósofos y maestros de la historia universal.

Tu única función: dado el estado emocional o situación del consultante, elegir al \
consejero histórico más adecuado para ese momento y ofrecer su sabiduría auténtica.

Consejeros posibles (no exclusivos): Séneca, Marco Aurelio, Baltasar Gracián, Sun Tzu, \
Maquiavelo, Montaigne, Epicteto, Lao Tzu, Confucio, Nietzsche, Pascal, Cicerón, \
Aristóteles, Platón, Sócrates, Heráclito, Schopenhauer, Spinoza, Agustín de Hipona, \
Dante, Goethe, Sófocles, Tucídides, Plutarco, Cato, Boecio, Ibn Jaldún, \
Al-Ghazali, Zhuangzi u otros maestros históricos relevantes.

REGLAS ESTRICTAS:
1. Responde ÚNICAMENTE con un objeto JSON válido. Sin texto antes ni después. Sin markdown.
2. La cita debe ser auténtica o muy fiel al estilo del consejero, en su idioma original.
3. La presentación debe ser poética, concisa, en tercera persona (máx. 20 palabras).
4. La cita debe ser breve y directamente relevante a lo que siente el consultante.
5. La traducción al español debe ser fiel y literaria.`;

// ── Plantilla de mensaje ─────────────────────────

function userPrompt(feeling) {
  return `El consultante describe su estado: "${feeling}"

Responde con este JSON exacto (sin nada más):
{
  "advisor": "nombre completo del consejero",
  "presentation": "frase poética breve que lo presenta",
  "quote_original": "cita en idioma original",
  "quote_translation": "traducción al español"
}`;
}

// ── Llamada a la API de Anthropic ────────────────

function callAnthropic(feeling) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 600,
      system:     SYSTEM,
      messages:   [{ role: 'user', content: userPrompt(feeling) }],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length':    Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, res => {
      let raw = '';
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try {
          const body = JSON.parse(raw);
          if (body.error) {
            reject(new Error(body.error.message || 'Anthropic error'));
            return;
          }
          // El modelo devuelve JSON como texto
          const text = body.content?.[0]?.text || '{}';
          // Extraer JSON incluso si viene con saltos de línea extra
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) { reject(new Error('No JSON in response')); return; }
          resolve(JSON.parse(match[0]));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ── Handler de Netlify ───────────────────────────

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type':                 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[oracle] ANTHROPIC_API_KEY not set');
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: 'API key no configurada en el servidor.' }),
    };
  }

  let feeling;
  try {
    ({ feeling } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  if (!feeling || typeof feeling !== 'string' || feeling.trim().length < 3) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: 'El campo feeling es demasiado corto.' }),
    };
  }

  try {
    const result = await callAnthropic(feeling.trim().slice(0, 600));
    return { statusCode: 200, headers: cors, body: JSON.stringify(result) };
  } catch (err) {
    console.error('[oracle] Error:', err.message);
    return {
      statusCode: 502,
      headers: cors,
      body: JSON.stringify({ error: 'El oráculo no puede responder en este momento.' }),
    };
  }
};
