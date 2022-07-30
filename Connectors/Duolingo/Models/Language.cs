
namespace achappey.Connectors.Duolingo.Models;

public class Language
{
    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public int Points { get; set; }

    public int Level { get; set; }
}