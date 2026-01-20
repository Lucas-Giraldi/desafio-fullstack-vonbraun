namespace Ciot.Domain.Entities;

public class CommandDescription
{
    public string Operation { get; set; } = default!;
    public string Description { get; set; } = default!;
    public Command Command { get; set; } = default!;
    public string Result { get; set; } = default!;
    public string Format { get; set; } = default!;
}
