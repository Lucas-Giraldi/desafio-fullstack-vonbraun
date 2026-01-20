using Ciot.Domain.Entities;

namespace Ciot.Domain.Requests;

public record CreateDeviceRequest(
    string Identifier,
    string Description,
    string Manufacturer,
    string Url,
    List<CreateCommandRequest> Commands
);

public record CreateCommandRequest(
    string Operation,
    string Description,
    string CommandText,
    string Result,
    string Format
);