import asyncio

HOST = "0.0.0.0"   
PORT = 9000

async def handle_client(reader: asyncio.StreamReader, writer: asyncio.StreamWriter):
    addr = writer.get_extra_info("peername")

    try:
        data = await reader.readuntil(b"\r")
        received = data.decode().strip()

        print(f"[DEVICE] Conectado por {addr}")
        print(f"[DEVICE] Recebido: {received}")

        response = f"ACK:{received}\r"

        writer.write(response.encode())
        await writer.drain()

        print(f"[DEVICE] Respondido: {response.strip()}")

    except Exception as e:
        print(f"[DEVICE] Erro: {e}")

    finally:
        writer.close()
        await writer.wait_closed()
        print(f"[DEVICE] Conexão encerrada {addr}")

async def main():
    server = await asyncio.start_server(
        handle_client,
        HOST,
        PORT
    )

    addr = server.sockets[0].getsockname()
    print(f"[DEVICE] Mock CIoTD escutando em {addr[0]}:{addr[1]}")

    async with server:
        await server.serve_forever()

if __name__ == "__main__":
    asyncio.run(main())
