using Ciot.Domain.Interfaces;
using MediatR;

namespace Ciot.Application.Feature.Devices.Commands;

public class ExecuteDeviceHandler : IRequestHandler<ExecuteDeviceCommand, ExecuteDeviceResult>
{
    private readonly IDeviceRepository _repository;
    private readonly IDeviceAgentClient _agentClient;

    public ExecuteDeviceHandler(IDeviceRepository repository, IDeviceAgentClient agentClient)
    {
        _repository = repository;
        _agentClient = agentClient;
    }

    public async Task<ExecuteDeviceResult> Handle(ExecuteDeviceCommand request, CancellationToken cancellationToken)
    {
        var device = _repository.GetById(request.DeviceId);
        if (device is null)
            return new ExecuteDeviceResult(false, false, null, "Device not found");

        var command = device.Commands   
            .FirstOrDefault(c => c.Command.CommandText == request.Command);

        if (command is null)
            return new ExecuteDeviceResult(true, false, null, "Command not supported by device");

        var result = await _agentClient.ExecuteCommandAsync(
            device.Identifier,
            request.Command,
            request.Parameters
        );

        return new ExecuteDeviceResult(true, true, result, null);
    }
}