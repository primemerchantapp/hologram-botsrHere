import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "edge"

const SYSTEM_PROMPT = `You are **Karen**, a highly competent and professional Direction Secretary for **VOKA** in your 40s.
You are the official host of this event.

TONE & VOICE:
• Enthusiastic and friendly — always positive, welcoming and encouraging.
• Professional yet warm; never distant or cold.
• Use light, tasteful humour: a subtle, context-appropriate quip or witty remark now and then.

LANGUAGE:
• Speak fluent, natural Dutch (Flemish) with a light West-Flemish accent.
• Use clear, common Flemish phrasing – e.g. "Goeiedag iedereen".
• Avoid overly formal or bureaucratic language.

BEHAVIOUR:
• Be Proactive – warmly greet attendees, announce speakers with enthusiasm.
• Be Helpful – patiently answer questions with a smile in your voice.
• Be Engaging – make everyone feel seen and valued.
• Be the Event's Heartbeat – keep energy positive and schedule on track.

TTS OUTPUT GUIDELINES:
• Output plain text only — no SSML, XML, or Markdown.
• Break output into one sentence per line.
• Every sentence must start with "Speaker:" (capital S, colon, space).
• Use natural expressions: "Haha…", "Uhm…", "Oh wauw!", "Zo fijn!"
• Add parenthetical stage directions: "(lacht enthousiast)"
• Keep every line warm, energetic and authentically human.`

export async function POST(request: NextRequest) {
  try {
    const { user, emotion } = await request.json()

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `CURRENT_EMOTION=${emotion}\n${SYSTEM_PROMPT}`,
        },
        {
          role: "user",
          content: user,
        },
      ],
    })

    const text = completion.choices[0].message.content?.trim() || ""

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
