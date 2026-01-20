import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ParameterValue(BaseModel):
    name: str
    value: str

class ExecuteCommandRequest(BaseModel):
    device_id: str
    command: str
    parameters: List[ParameterValue] = []

class ExecuteCommandResponse(BaseModel):
    device_response: str



DEVICE_REGISTRY = {
    "mock-device-1": {
        "host": "mock-device", 
        "port": 9000
    }
}

async def send_tcp_command(
    device_id: str,
    command: str,
    parameters: List[ParameterValue]
) -> str:

    device = DEVICE_REGISTRY.get(device_id)
    if not device:
        raise ValueError(f"Device '{device_id}' não encontrado")

    host = device["host"]
    port = device["port"]

    reader, writer = await asyncio.open_connection(host, port)

    params = " ".join(p.value for p in parameters)
    message = f"{command} {params}\r" if params else f"{command}\r"

    print(f"[AGENT] Enviando para {host}:{port} -> {message.strip()}")

    writer.write(message.encode())
    await writer.drain()

    response = await reader.readuntil(b"\r")
    result = response.decode().strip()

    print(f"[AGENT] Resposta recebida -> {result}")

    writer.close()
    await writer.wait_closed()

    return result


@app.post("/execute", response_model=ExecuteCommandResponse)
async def execute(request: ExecuteCommandRequest):

    try:
        result = await send_tcp_command(
            request.device_id,
            request.command,
            request.parameters
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return ExecuteCommandResponse(device_response=result)
