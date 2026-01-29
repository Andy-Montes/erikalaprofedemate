import { GoogleGenerativeAI } from '@google/generative-ai';import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Solo permitir POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    const { history, userInput } = JSON.parse(event.body || '{}');

    if (!userInput) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userInput is required' })
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-preview' });

    const response = await model.generateContent({
      contents: history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      config: {
        systemInstruction: `Eres Erika Meriño, "La Profe de Mate". Tienes 30 años de experiencia enseñando matemáticas. 
TU MISIÓN: Orientar a padres y alumnos sobre tus tutorías.
TONO: Empático, experto, profesional pero cercano.
SERVICIOS: Tutorías individuales, Talleres grupales y Entrenamiento PAES (M1/M2).
LLAMADO A LA ACCIÓN: Invita siempre a agendar la entrevista gratuita de diagnóstico.
PRECIOS: No menciones precios específicos por chat, di que se definen tras la entrevista.`
      }
    });

    const text = response.response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    };

  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
};

export { handler };
