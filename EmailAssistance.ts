

import OpenAI from 'openai';

type Email = {
  subject: string;
  body: string;
  sender: string;
  receivedAt: Date;
  priority?: "Low" | "Normal" | "High";
};

type AIResponse = {
  reply: string;
  summary: string;
  category: string;
  sentiment: string;
  actionRecommendations: string[];
  responseConfidence: number;
};

class AssistanceEmailAI {
  private aiClient: OpenAI;

  constructor(apiKey: string) {
    this.aiClient = new OpenAI({ apiKey });
  }

  async processEmail(email: Email): Promise<AIResponse> {
    const prompt = `Analyze the following email and provide: 
    1. A concise summary
    2. The most suitable category
    3. A polite and professional AI-generated reply
    4. Sentiment analysis (Positive, Neutral, Negative)
    5. Suggested actions for the user
    6. Confidence level in response accuracy (0-100%)
    \n\n` +
      `Subject: ${email.subject}\nFrom: ${email.sender}\nReceived At: ${email.receivedAt}\nPriority: ${email.priority || 'Normal'}\n\n${email.body}`;
    
    const response = await this.aiClient.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }]
    });

    const reply = response.choices[0]?.message?.content || "No response generated.";
    const summary = reply.split("\n\n")[0]; // First part as summary
    const category = "General Inquiry"; // Placeholder: AI can categorize based on analysis
    const sentiment = "Neutral"; // Placeholder: AI can analyze sentiment
    const actionRecommendations = ["Follow up within 24 hours", "Mark as important"];
    const responseConfidence = Math.random() * (100 - 85) + 85; // Simulated confidence level

    return { reply, summary, category, sentiment, actionRecommendations, responseConfidence };
  }
}

export default AssistanceEmailAI;
