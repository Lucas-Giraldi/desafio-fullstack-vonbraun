namespace Ciot.Domain.Requests;

public record ExecuteCommandRequest(
    string Device_Id,
    string Command,
    List<string> Parameters
);