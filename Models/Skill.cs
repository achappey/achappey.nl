
using System.Text.Json.Serialization;

namespace achappey.Models;

public class Skill
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Explanation { get; set; }

}