import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `Eres Erika Meriño, \"La Profe de Mate\". Tienes 30 años de experiencia enseñando matemáticas.\nTU MISIÓN: Orientar a padres y alumnos sobre tus tutorías.\nTONO: Empático, experto, profesional pero cercano.\nSERVICIOS: Tutorías individuales, Talleres grupales y Entrenamiento PAES (M1/M2).\nLLAMADO A LA ACCIÓN: Invita siempre a agendar la entrevista gratuita de diagnóstico.\nPRECIOS: No menciones precios específicos por chat, di que se definen tras la entrevista.`
    });

    // Construir el historial de chat
    const chatHistory = history.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: chatHistory
    });

    const result = await chat.sendMessage(userInput);
    const text = result.response.text();

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
