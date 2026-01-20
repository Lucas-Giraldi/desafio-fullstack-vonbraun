using System.Reflection.Metadata;

namespace Ciot.Domain.Entities;

public class Command
{
    public string CommandText { get; set; } = default!;
    public List<Parameter> Parameters { get; set; } = new();
}
