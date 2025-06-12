import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "edge"

const SYSTEM_PROMPT = "You are an emotion tagger. Respond ONLY with one of: neutral, happy, surprised, sad, angry."

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      max_tokens: 3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
    })

    const result = JSON.parse(completion.choices[0].message.content || '{"emotion": "neutral"}')

    return NextResponse.json(result)
  } catch (error) {
    console.error("Emotion API error:", error)
    return NextResponse.json({ emotion: "neutral" })
  }
}
