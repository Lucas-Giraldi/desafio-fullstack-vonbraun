using Ciot.Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Ciot.Application.Feature.Devices.Queries;

public record GetAllDevicesQuery() : IRequest<IEnumerable<Device>>;