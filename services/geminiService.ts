import { Message } from '../types';

export const getGeminiResponse = async (history: Message[], userInput: string): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ history, userInput })
    });

    if (!response.ok) {
      throw new Error('Error al obtener respuesta de Gemini');
    }

    const data = await response.json();
    return data.text;
  } catch (error: any) {
    console.error('Error:', error);
    return 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.';
  }
};
