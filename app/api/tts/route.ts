import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

const emotionStyleMap = {
  neutral: "narration",
  happy: "cheerful",
  surprised: "excited",
  sad: "empathetic",
  angry: "tense",
}

export async function POST(request: NextRequest) {
  try {
    const { text, emotion } = await request.json()

    const style = emotionStyleMap[emotion as keyof typeof emotionStyleMap] ?? "narration"

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: process.env.ELEVENLABS_MODEL_ID ?? "eleven_v3_alpha",
          optimize_streaming_latency: 1,
          style,
          voice_settings: {
            stability: 0.3,
            similarity_boost: 0.5,
          },
        }),
      },
    )

    return new Response(response.body, {
      headers: {
        "content-type": "audio/wav",
      },
    })
  } catch (error) {
    console.error("TTS API error:", error)
    return NextResponse.json({ error: "Failed to generate speech" }, { status: 500 })
  }
}
