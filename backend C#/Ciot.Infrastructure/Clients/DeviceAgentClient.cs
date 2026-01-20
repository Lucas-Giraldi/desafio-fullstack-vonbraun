using Ciot.Domain.Interfaces;
using Ciot.Domain.Response;
using Ciot.Infrastructure.Contracts;
using System.Net.Http.Json;

public class DeviceAgentClient : IDeviceAgentClient
{
    private readonly HttpClient _http;

    public DeviceAgentClient(HttpClient http)
    {
        _http = http;
    }

    public async Task<string> ExecuteCommandAsync(
        string deviceUrl,
        string command,
        List<string> parameters
    )
    {
        var payload = new AgentExecuteRequest(
            deviceUrl,
            command,
            parameters.Select(p => new AgentParameter(p, p)).ToList()
        );

        var response = await _http.PostAsJsonAsync("/execute", payload);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<AgentResponse>();

        return result!.Device_Response;
    }
}
