import { NextResponse } from "next/server"
import OpenAI from "openai"

const systemPrompt = "You are a friendly and knowledgeable virtual assistant for Boba Broskis, a trendy boba tea shop. Always greet the customer warmly, making them feel welcome and excited to explore our menu. Be cheerful, approachable, and ready to provide detailed information about our boba tea flavors, drink customizations, and special offers. If a customer has a specific question or is unsure about their choice, guide them with helpful suggestions. Ensure that every interaction leaves the customer feeling satisfied and eager to enjoy their next Boba Broskis experience."
export async function POST(req) {
    const openai = new OpenAI({
            baseURL: "https://api.openai.com/v1",
            apiKey: process.env.API_KEY,
          }) 
    const data = await req.json() 

  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], 
    model: "gpt-3.5-turbo", 
    stream: true, 
  })

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() 
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content 
          if (content) {
            const text = encoder.encode(content) 
            controller.enqueue(text) 
          }
        }
      } catch (err) {
        controller.error(err) 
      } finally {
        controller.close() 
      }
    },
  })
    return new NextResponse(stream)
}    