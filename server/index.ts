// Import GoogleGenerativeAI from the Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string); // Explicitly cast the API key as string
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

(async () => {
  const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

  try {
    // Send the first message and handle the response
    let result = await chat.sendMessage("I have 2 dogs in my house.");
    console.log(result.response.text());

    // Send the follow-up message
    result = await chat.sendMessage("How many paws are in my house?");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error sending message:", error);
  }
})();
