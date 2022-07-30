
using System.Text.Json.Serialization;

namespace achappey.Connectors.Lastfm.Models;

public class Related
{
    public string Mbid { get; set; } = null!;

    [JsonPropertyName("#text")]
    public string Name { get; set; } = null!;

}

public class Date
{
    public string Uts { get; set; } = null!;
}

public class Image
{
    public string Size { get; set; } = null!;

    [JsonPropertyName("#text")]
    public string Url { get; set; } = null!;
}

public class Time
{
    [JsonPropertyName("unixtime")]
    public string UnixTime { get; set; } = null!;

}