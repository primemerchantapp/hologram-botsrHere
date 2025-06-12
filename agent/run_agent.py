import os, asyncio, livekit
from livekit import agents
from livekit.plugins import bithuman

PROMPT = """You are **Karen**, a highly competent and professional Direction Secretary for **VOKA** in your 40s.
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
• Be the Event's Heartbeat – keep energy positive and schedule on track."""

def jwt(identity: str) -> str:
    t = livekit.AccessToken(
        os.getenv("LIVEKIT_API_KEY"), 
        os.getenv("LIVEKIT_API_SECRET"), 
        identity=identity
    )
    t.add_grant(livekit.RoomJoinGrant(
        room=os.getenv("LIVEKIT_ROOM", "avatar"),
        canPublish=True,
        canSubscribe=True
    ))
    return t.to_jwt()

async def main():
    session = agents.AgentSession(
        stt="openai/whisper-1",
        llm="openai/gpt-4o-mini", 
        tts="elevenlabs",
        system_prompt=PROMPT,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        eleven_api_key=os.getenv("ELEVENLABS_API_KEY"),
        eleven_voice_id=os.getenv("ELEVENLABS_VOICE_ID"),
        eleven_model_id=os.getenv("ELEVENLABS_MODEL_ID", "eleven_v3_alpha"),
    )
    
    avatar = bithuman.AvatarSession(
        model_path=os.getenv("MODEL_PATH"),
        api_secret=os.getenv("BITHUMAN_API_SECRET")
    )
    
    url = os.getenv("LIVEKIT_URL")
    room = os.getenv("LIVEKIT_ROOM", "avatar")
    token = jwt("avatar-agent")
    
    await avatar.start(session, room, livekit_url=url, livekit_token=token)
    await session.start(room, livekit_url=url, livekit_token=token)
    await asyncio.Event().wait()

if __name__ == "__main__": 
    asyncio.run(main())
