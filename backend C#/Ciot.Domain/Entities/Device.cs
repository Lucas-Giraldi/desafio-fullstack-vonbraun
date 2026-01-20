namespace Ciot.Domain.Entities;

public class Device
{
    public string Identifier { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Manufacturer { get; set; } = default!;
    public string Url { get; set; } = default!;
    public List<CommandDescription> Commands { get; set; } = new();
}
