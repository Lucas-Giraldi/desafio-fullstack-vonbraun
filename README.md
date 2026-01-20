## Desafio Técnico – Desenvolvedor Full Stack Sênior

Centro de Pesquisas Avançadas Wernher von Braun

Visão Geral

Solução para o desafio técnico que simula um ecossistema IoT, integrando dispositivos físicos a uma plataforma digital utilizando:

Backend: C# (.NET)

Simulador IoT: Python

Frontend: Angular

O foco está em arquitetura, integração entre componentes e organização do código.

Arquitetura

O simulador IoT (Python) roda em container Docker

Eventos são enviados ao backend via API REST

O backend processa e persiste os dados

O frontend consome a API para visualização

Tecnologias

.NET 8 / ASP.NET Core

Python 3 (Docker / Docker Compose)

Angular

HTTP / REST

Execução

Simulador IoT (Python)

docker-compose up -d


Backend (.NET)

dotnet restore
dotnet run


Frontend (Angular)

npm install
ng serve

Observações Importantes

O simulador IoT utiliza um dispositivo fixo (mock-device-1) definido no código Python

Embora o backend permita cadastro de múltiplos dispositivos, a execução do simulador funciona apenas com o mock-device-1

As requests de comando do mock-device-1 foram exportadas do Postman e versionadas no repositório para facilitar os testes

Autor

Lucas Giraldi
Desenvolvedor Full Stack Sênior
