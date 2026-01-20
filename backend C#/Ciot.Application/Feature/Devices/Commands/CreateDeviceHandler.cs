using Ciot.Domain.Entities;
using Ciot.Domain.Interfaces;
using Ciot.Application.Feature.Devices.Commands;
using MediatR;

namespace Ciot.Application.Feature.Devices.Commands;

public class CreateDeviceHandler : IRequestHandler<CreateDeviceCommand, Device>
{
    private readonly IDeviceRepository _repository;

    public CreateDeviceHandler(IDeviceRepository repository)
    {
        _repository = repository;
    }

    public Task<Device> Handle(CreateDeviceCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        var device = new Device
        {
            Identifier = req.Identifier,
            Description = req.Description,
            Manufacturer = req.Manufacturer,
            Url = req.Url,
            Commands = req.Commands.Select(c => new CommandDescription
            {
                Operation = c.Operation,
                Description = c.Description,
                Result = c.Result,
                Format = c.Format,
                Command = new Command
                {
                    CommandText = c.CommandText
                }
            }).ToList()
        };

        _repository.Add(device);

        return Task.FromResult(device);
    }
}