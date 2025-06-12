import { type NextRequest, NextResponse } from "next/server"
import { AccessToken } from "@livekit/server-sdk"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const identity = searchParams.get("identity") ?? `guest-${Date.now()}`

  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ error: "Missing LiveKit credentials" }, { status: 500 })
  }

  const token = new AccessToken(apiKey, apiSecret, { identity })
  token.addGrant({
    roomJoin: true,
    room: "avatar",
    canPublish: true,
    canSubscribe: true,
  })

  return NextResponse.json({ token: token.toJwt() })
}
