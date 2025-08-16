
import { GoogleGenAI, Type } from "@google/genai";
import { FrictionEvent, GeminiAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeFrictionEvent = async (event: FrictionEvent): Promise<GeminiAnalysis | null> => {
    if (!API_KEY) return null;
    
    const prompt = `
      You are a world-class UX design expert and digital product analyst.
      A user experienced a digital friction event on our e-commerce checkout page. Here are the details:
      - Friction Type: "${event.type}"
      - Element ID: "${event.elementId}"
      - Description of event: "${event.description}"
      - Timestamp: "${event.timestamp.toISOString()}"

      Based on this information, please provide a concise analysis. Identify three likely root causes for this friction and suggest three actionable UX improvements to mitigate it in the future.
      Your response must be in the specified JSON format.
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rootCauses: {
              type: Type.ARRAY,
              description: "An array of three strings, each describing a likely root cause for the user's friction.",
              items: { type: Type.STRING }
            },
            recommendations: {
              type: Type.ARRAY,
              description: "An array of three strings, each providing a specific, actionable UX recommendation.",
              items: { type: Type.STRING }
            }
          },
          required: ["rootCauses", "recommendations"]
        },
      },
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result && Array.isArray(result.rootCauses) && Array.isArray(result.recommendations)) {
        return result as GeminiAnalysis;
    } else {
        throw new Error("Invalid JSON structure received from API");
    }

  } catch (error) {
    console.error("Error analyzing friction event with Gemini:", error);
    // Fallback in case of API error or malformed response
    return {
        rootCauses: ["API Error: Could not analyze event.", "The AI model might be unavailable or the response was malformed.", "Check the console for more details."],
        recommendations: ["Verify API key and network connectivity.", "Ensure the prompt is correctly formatted.", "Review the Gemini API documentation for any recent changes."]
    };
  }
};
