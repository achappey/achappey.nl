
using System.Text.Json.Serialization;

namespace achappey.Connectors.WakaTime.Models;

public class Summary
{

    [JsonPropertyName("languages")]
    public IEnumerable<Activity> Languages { get; set; } = null!;

    [JsonPropertyName("editors")]
    public IEnumerable<Activity> Editors { get; set; } = null!;

    [JsonPropertyName("range")]
    public Range Range { get; set; } = null!;
}

public class Range
{
    [JsonPropertyName("date")]
    public string Date { get; set; } = null!;
}

public class Activity
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("total_seconds")]
    public float TotalSeconds { get; set; }
}
