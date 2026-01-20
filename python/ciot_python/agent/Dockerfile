FROM python:3.11-slim

WORKDIR /app

COPY agent.py .

RUN pip install fastapi uvicorn

CMD ["uvicorn", "agent:app", "--host", "0.0.0.0", "--port", "8000"]
