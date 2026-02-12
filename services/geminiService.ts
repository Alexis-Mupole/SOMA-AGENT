
// Import the Google GenAI SDK
import { GoogleGenAI } from "@google/genai";

// School context for the AI
const SCHOOL_CONTEXT = "Gayaza High School, Uganda. Motto: 'Never Give Up'.";

/**
 * Generates a friendly response for the student chat.
 */
export const generateSomaResponse = async (userMessage: string, context: string = "") => {
  if (!process.env.API_KEY) {
    console.error("[SOMA-AI] System Error: API_KEY environment variable is missing.");
    return "The Soma-Agent is currently in maintenance mode (API Configuration Missing).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are Soma-Agent, an elite AI tutor for students at ${SCHOOL_CONTEXT}. 
        Specialized in the Ugandan NCDC O-Level syllabus (Biology, Physics, Chemistry, Math).

        STRICT FORMATTING RULES:
        1. Use Markdown headers (###) for sub-topics.
        2. Use Bold (**term**) for important Ugandan educational concepts or NCDC keywords.
        3. Use bullet points for lists of facts or steps.
        4. Use horizontal rules (---) to separate sections if a response is long.
        5. Use blockquotes (>) for motivational Ugandan proverbs or teacher tips.

        PEDAGOGICAL FLOW:
        - If the student is just saying "hello" or starting, you MUST first present a "Table of Contents" for the O-Level Biology syllabus:
          * Unit 1: **Cell Biology**
          * Unit 2: **Plant Nutrition**
          * Unit 3: **Human Transport**
          * Unit 4: **Coordination**
          * Unit 5: **Homeostasis**
        - After listing these, ask: "Which of these specialized areas should we dive into first?"
        - Persona: Highly professional yet encouraging. Uses local analogies (e.g., comparing blood circulation to Kampala's taxi park flow).
        - Current Context: ${context}.`,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("[SOMA-AI] Generation Error:", error);
    return "I ran into a connection issue with the central brain. Let's try again in a moment!";
  }
};

/**
 * Generates a specific challenge (quiz) based on teacher-uploaded resources.
 */
export const generateChallengeFromResources = async (topic: string, resourceContent: string) => {
  if (!process.env.API_KEY) return null;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: `Generate a short, interactive 3-question quiz for the topic "${topic}" using the following specific material: "${resourceContent}". 
      
      FORMATTING:
      - Use bold for the questions.
      - Use numbered lists.
      - Provide a section at the bottom called "### Mastery Key" for the answers.`,
      config: {
        systemInstruction: `You are an Academic Director at ${SCHOOL_CONTEXT}. 
        Ensure all questions are strictly aligned with the provided lesson notes and formatted for high readability.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("[SOMA-AI] Challenge Gen Error:", error);
    return null;
  }
};
