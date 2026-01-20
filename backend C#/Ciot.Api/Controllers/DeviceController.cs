using Ciot.Domain.Requests;
using Ciot.Application.Feature.Devices.Commands;
using Ciot.Application.Feature.Devices.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Ciot.Api.Controllers;

[ApiController]
[Route("api/device")]
public class DeviceController : ControllerBase
{
    private readonly IMediator _mediator;

    public DeviceController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> Execute([FromBody] ExecuteCommandRequest request)
    {
        var result = await _mediator.Send(new ExecuteDeviceCommand(request.Device_Id, request.Command, request.Parameters));

        if (!result.DeviceFound)
            return NotFound(result.ErrorMessage);

        if (!result.CommandSupported)
            return BadRequest(result.ErrorMessage);

        return Ok(new { result = result.Result });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDeviceRequest request)
    {
        var device = await _mediator.Send(new CreateDeviceCommand(request));

        return CreatedAtAction(
            nameof(GetById),
            new { id = device.Identifier },
            device
        );
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var devices = await _mediator.Send(new GetAllDevicesQuery());
        return Ok(devices);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var device = await _mediator.Send(new GetDeviceByIdQuery(id));
        if (device is null)
            return NotFound();

        return Ok(device);
    }
}
