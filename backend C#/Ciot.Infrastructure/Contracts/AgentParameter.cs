using System.Text.Json.Serialization;

namespace Ciot.Infrastructure.Contracts;

public record AgentParameter(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("value")] string Value
);
