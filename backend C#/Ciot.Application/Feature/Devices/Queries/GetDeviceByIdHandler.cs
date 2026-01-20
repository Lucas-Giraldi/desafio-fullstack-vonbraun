using Ciot.Domain.Interfaces;
using MediatR;

namespace Ciot.Application.Feature.Devices.Queries;

public class GetDeviceByIdHandler : IRequestHandler<GetDeviceByIdQuery, Ciot.Domain.Entities.Device?>
{
    private readonly IDeviceRepository _repository;

    public GetDeviceByIdHandler(IDeviceRepository repository)
    {
        _repository = repository;
    }

    public Task<Ciot.Domain.Entities.Device?> Handle(GetDeviceByIdQuery request, CancellationToken cancellationToken)
    {
        var device = _repository.GetById(request.Id);
        return Task.FromResult(device);
    }
}