using Ciot.Domain.Interfaces;
using MediatR;

namespace Ciot.Application.Feature.Devices.Queries;

public class GetAllDevicesHandler : IRequestHandler<GetAllDevicesQuery, IEnumerable<string>>
{
    private readonly IDeviceRepository _repository;

    public GetAllDevicesHandler(IDeviceRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<string>> Handle(GetAllDevicesQuery request, CancellationToken cancellationToken)
    {
        var devices = _repository.GetAll().Select(d => d.Identifier);
        return Task.FromResult(devices);
    }
}