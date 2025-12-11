import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserPreferences, ItineraryResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: {
      type: Type.STRING,
      description: "A creative and catchy title for the trip."
    },
    summary: {
      type: Type.STRING,
      description: "A brief 2-sentence summary of what to expect."
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "Theme of the day (e.g., 'Historical Kyoto')" },
          city: { type: Type.STRING, description: "Main city or region for this day" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Approximate time (e.g., '09:00 AM')" },
                activityName: { type: Type.STRING },
                description: { type: Type.STRING, description: "2-3 sentences about what to do." },
                location: { type: Type.STRING, description: "Specific venue or area name." },
                tips: { type: Type.STRING, description: "A quick travel tip (e.g., 'Buy tickets in advance')." }
              },
              required: ["time", "activityName", "description", "location", "tips"]
            }
          }
        },
        required: ["dayNumber", "theme", "city", "activities"]
      }
    }
  },
  required: ["tripTitle", "summary", "days"]
};

export const generateItinerary = async (prefs: UserPreferences): Promise<ItineraryResponse> => {
  const prompt = `
    Create a detailed ${prefs.duration}-day travel itinerary for Japan.
    
    Traveler Profile:
    - Season: ${prefs.season}
    - Group: ${prefs.travelers}
    - Budget Level: ${prefs.budget}
    - Key Interests: ${prefs.interests.join(", ")}
    
    The itinerary should be realistic, accounting for travel time between locations. 
    Focus on specific hidden gems alongside major attractions based on their interests.
    Ensure the logistics make sense geographically.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        systemInstruction: "You are an expert Japan travel concierge with deep local knowledge. You prioritize efficient routes and authentic experiences.",
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ItineraryResponse;
    } else {
      throw new Error("No content generated");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};