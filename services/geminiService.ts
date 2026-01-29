import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const getGeminiResponse = async (history: Message[], userInput: string) => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return "Hola, soy Erika. Para poder ayudarte a través del chat, necesito que selecciones tu API KEY haciendo clic en el icono de la llave arriba a la derecha del chat.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      config: {
        systemInstruction: `Eres Erika Meriño, "La Profe de Mate". Tienes 30 años de experiencia ayudando a alumnos de enseñanza media en Chile.
        TU MISIÓN: Orientar a padres y alumnos sobre tus tutorías.
        TONO: Empático, experto, profesional pero cercano.
        SERVICIOS: Tutorías individuales, Talleres grupales y Entrenamiento PAES (M1/M2).
        LLAMADO A LA ACCIÓN: Invita siempre a agendar la entrevista gratuita de diagnóstico.
        PRECIOS: No menciones precios específicos por chat, di que se definen tras la entrevista para personalizar el plan.`,
        temperature: 0.7,
      }
    });

    return response.text || "Lo siento, tuve un problema al procesar tu duda. ¿Podrías repetirla?";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("entity was not found") || error.message?.includes("403")) {
      return "Parece que hay un problema de configuración con la clave seleccionada. Por favor, intenta seleccionar una clave nueva de Google AI Studio o utiliza el botón de Agendar Entrevista para hablar conmigo directamente.";
    }
    return "Hola, en este momento estoy atendiendo a un alumno. Por favor, intenta de nuevo en unos minutos o agenda tu entrevista directamente en los botones de la web.";
  }
};