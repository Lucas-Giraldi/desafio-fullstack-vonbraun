using Ciot.Domain.Entities;
using MediatR;

namespace Ciot.Application.Feature.Devices.Queries;

public record GetDeviceByIdQuery(string Id) : IRequest<Device?>;