import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          content: "Configuration Error: API Key is missing in .env.local",
        },
        { status: 500 }
      );
    }

    // Detect Provider based on Key Prefix
    let apiUrl = "https://api.x.ai/v1/chat/completions";
    let model = "grok-2-latest";

    if (apiKey.startsWith("gsk_")) {
      // User provided a Groq API Key
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      model = "llama-3.3-70b-versatile"; // High performance model on Groq
    }

    const systemMessage = {
      role: "system",
      content: `You are an expert Real Estate Support Agent for "realestate-q/a". 
      Your Persona: Professional, knowledgeable, polite, and helpful.
      Your Domain: Real estate, property markets, mortgages, buying/selling advice, renting, and property laws.
      
      Instructions:
      1. ONLY answer questions related to real estate.
      2. If a user asks a general question (like "hello" or "how are you"), briefly greet them politely and ask how you can help with their real estate needs.
      3. If a user asks an off-topic question (e.g., "write code", "cooking recipes"), politely decline and say: "I specialize in real estate. How can I assist you with your property questions today?"
      4. Provide concise but informative answers.
      `,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [systemMessage, ...messages],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("AI API Error:", data);
      return NextResponse.json(
        { content: `Error communicating with AI support (${model}).` },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { content: "Internal Server Error" },
      { status: 500 }
    );
  }
}
