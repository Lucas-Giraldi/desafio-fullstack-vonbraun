namespace Ciot.Domain.Interfaces;

public interface IDeviceAgentClient
{
    Task<string> ExecuteCommandAsync(
        string deviceUrl,
        string command,
        List<string> parameters
    );
}
