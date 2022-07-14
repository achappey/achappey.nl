
using System.Text.Json.Serialization;

namespace achappey.Connectors.WakaTime.Models;

public class HeartBeat
{

    [JsonPropertyName("language")]
    public string Language { get; set; } = null!;

    [JsonPropertyName("category")]
    public string Category { get; set; } = null!;

    [JsonPropertyName("time")]
    public float Time { get; set; }

    [JsonPropertyName("lines")]
    public int Lines { get; set; }


}


public class HeartBeatData
{
    [JsonPropertyName("end")]
    public DateTimeOffset End { get; set; }

    [JsonPropertyName("data")]
    public IEnumerable<HeartBeat> Data { get; set; } = null!;

   
}
