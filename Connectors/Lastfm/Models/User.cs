
using System.Text.Json.Serialization;

namespace achappey.Connectors.Lastfm.Models;

public class User
{

    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string PlayCount { get; set; } = null!;

    [JsonPropertyName("registered")]
    public Time Registered { get; set; } = null!;

}

public class LastfmUserResponse
{
    [JsonPropertyName("user")]
    public User User { get; set; } = null!;
}

