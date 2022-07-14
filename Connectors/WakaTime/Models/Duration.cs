
using System.Text.Json.Serialization;

namespace achappey.Connectors.WakaTime.Models;

public class Duration
{

    [JsonPropertyName("category")]
    public string Category { get; set; } = null!;

    [JsonPropertyName("time")]
    public float Start { get; set; }

    [JsonPropertyName("duration")]
    public float Seconds { get; set; }

    public float End
    {
        get
        {
            return Start + Seconds;
        }
    }
}

public class DurationData
{
    [JsonPropertyName("end")]
    public DateTimeOffset End { get; set; }

    [JsonPropertyName("data")]
    public IEnumerable<Duration> Data { get; set; } = null!;


}
