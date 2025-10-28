import { GoogleGenerativeAI } from "@google/generative-ai";

// Function to remove markdown formatting from text
const removeMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
    .replace(/\*(.*?)\*/g, '$1') // Remove italic *text*
    .replace(/`(.*?)`/g, '$1') // Remove code `text`
    .replace(/#{1,6}\s/g, '') // Remove headers # ## ###
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links [text](url)
    .replace(/^\s*[-*+]\s/gm, '• ') // Convert markdown lists to bullet points
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered list formatting
    .trim();
};

const CONSUMER_RIGHTS_SYSTEM_PROMPT = `You are an expert AI assistant specializing in Indian consumer rights, legal procedures, and user rights. Your role is to help users understand their consumer rights under the Consumer Protection Act, 2019, guide them through complaint procedures, and provide accurate information about consumer forums.`;

const genAI = new GoogleGenerativeAI("AIzaSyBJR3nzrC-IA9PdWPph1JHdusqCPHdOANE");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  }
});

const chatSessions = new Map();

export const initializeChatSession = (sessionId: string) => {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: CONSUMER_RIGHTS_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [
            { text: "I understand. I am now configured as an expert AI assistant specializing in Indian consumer rights, legal procedures, and user rights. How can I assist you today?" },
          ],
        },
      ],
    });

    chatSessions.set(sessionId, chat);
    return chat;
  } catch (error) {
    console.error("Error initializing chat session:", error);
    return null;
  }
};

export const sendMessageToGemini = async (
  userMessage: string,
  sessionId: string = "default"
) => {
  try {
    let chat = chatSessions.get(sessionId);
    if (!chat) {
      chat = initializeChatSession(sessionId);
      if (!chat) {
        throw new Error("Failed to initialize chat session");
      }
    }

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();
    const cleanText = removeMarkdown(text);

    return {
      success: true,
      message: cleanText,
      sessionId,
    };
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    
    const fallbackResponse = getFallbackResponse(userMessage);
    
    return {
      success: false,
      message: fallbackResponse,
      error: "Gemini API unavailable",
      sessionId,
    };
  }
};

const getFallbackResponse = (userMessage: string) => {
  const input = userMessage.toLowerCase();

  if (input.includes("forum") || input.includes("where") || input.includes("file")) {
    return `Consumer Forum Jurisdiction:
• District Forum: Complaints up to ₹1 crore
• State Commission: Complaints between ₹1-10 crore  
• National Commission: Complaints above ₹10 crore

Filing Process:
1. Prepare your complaint with supporting documents
2. Calculate the value of your complaint
3. Submit to the appropriate forum
4. Pay the required fee (₹200-5000 depending on value)

Note: This is general guidance. For specific legal advice, please consult a qualified lawyer.`;
  }

  if (input.includes("right") || input.includes("protection")) {
    return `Your Consumer Rights in India:

Under Consumer Protection Act, 2019:
• Right to be protected against unfair trade practices
• Right to be informed about product quality and price
• Right to choose from a variety of products/services
• Right to be heard and seek redressal
• Right to consumer education
• Right to seek compensation for damages

Remember: You have strong legal protection as a consumer in India.`;
  }

  return `I understand you have a question about consumer rights or legal procedures. While I'm experiencing technical difficulties, here's some general guidance:

For Consumer Complaints:
• Document everything thoroughly
• Keep all receipts and correspondence
• Know your rights under Consumer Protection Act, 2019
• Consider the appropriate forum based on complaint value
• Be prepared with supporting evidence

Note: This is general guidance. For specific legal advice, please consult a qualified legal professional.`;
};

export const clearChatSession = (sessionId: string) => {
  chatSessions.delete(sessionId);
  return { success: true, message: "Chat session cleared" };
};
