using System.Text.Json.Serialization;

namespace achappey.Connectors.WakaTime.Models;

public class User
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("username")]
    public string Username { get; set; } = null!;

    [JsonPropertyName("photo")]
    public string? Photo { get; set; }

    [JsonPropertyName("created_at")]
    public string CreatedAt { get; set; } = null!;

    [JsonPropertyName("modified_at")]
    public string ModifiedAt { get; set; } = null!;
}
