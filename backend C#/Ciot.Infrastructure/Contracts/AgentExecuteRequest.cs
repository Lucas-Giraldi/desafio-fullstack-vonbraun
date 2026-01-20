using System.Text.Json.Serialization;

namespace Ciot.Infrastructure.Contracts;


public record AgentExecuteRequest(
    [property: JsonPropertyName("device_id")] string DeviceId,
    [property: JsonPropertyName("command")] string Command,
    [property: JsonPropertyName("parameters")] List<AgentParameter> Parameters
);
