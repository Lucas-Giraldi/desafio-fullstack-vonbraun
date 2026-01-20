using MediatR;
using System.Collections.Generic;

namespace Ciot.Application.Feature.Devices.Commands;

public record ExecuteDeviceCommand(string DeviceId, string Command, List<string> Parameters) : IRequest<ExecuteDeviceResult>;

public record ExecuteDeviceResult(bool DeviceFound, bool CommandSupported, string? Result, string? ErrorMessage);