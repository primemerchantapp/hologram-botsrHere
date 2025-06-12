FROM python:3.11-slim

WORKDIR /app

RUN apt-get update -qq && apt-get install -y --no-install-recommends curl \
 && pip install "livekit-agents[bithuman]" openai elevenlabs livekit

ENV MODEL_DIR=/app/asset/avatar/karen 
ENV MODEL_PATH=$MODEL_DIR/karen.imx

COPY fetch_model.sh /usr/local/bin/fetch_model
COPY run_agent.py ./run_agent.py

RUN chmod +x /usr/local/bin/fetch_model

CMD fetch_model && python run_agent.py
