using Ciot.Domain.Entities;
using Ciot.Domain.Requests;
using MediatR;

namespace Ciot.Application.Feature.Devices.Commands;

public record CreateDeviceCommand(CreateDeviceRequest Request) : IRequest<Device>;