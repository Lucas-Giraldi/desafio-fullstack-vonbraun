using Ciot.Domain.Entities;
using Ciot.Domain.Interfaces;
using MediatR;

namespace Ciot.Application.Feature.Devices.Queries;

public class GetAllDevicesHandler : IRequestHandler<GetAllDevicesQuery, IEnumerable<Device>>
{
    private readonly IDeviceRepository _repository;

    public GetAllDevicesHandler(IDeviceRepository repository)
    {
        _repository = repository;
    }

    public Task<IEnumerable<Device>> Handle(GetAllDevicesQuery request, CancellationToken cancellationToken)
    {
        var devices = _repository.GetAll();
        return Task.FromResult(devices);
    }
}