
using System.Text.Json.Serialization;

namespace achappey.Connectors.Lastfm.Models;

public class Artist
{

    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;
    
    [JsonPropertyName("mbid")]
    public string Id { get; set; } = null!;

}
