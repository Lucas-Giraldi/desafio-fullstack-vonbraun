using Ciot.Domain.Interfaces;
using Ciot.Infrastructure.Repositories;
using MediatR;
using Ciot.Application.Feature.Devices.Commands;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(CreateDeviceHandler).Assembly)
);

builder.Services.AddHttpClient<IDeviceAgentClient, DeviceAgentClient>(client =>
{
    client.BaseAddress = new Uri("http://localhost:8000");
});
builder.Services.AddSingleton<IDeviceRepository, InMemoryDeviceRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.MapControllers();

app.Run();
