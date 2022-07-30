using System.Text.Json.Serialization;

namespace achappey.Connectors.WakaTime.Models;

public class WakaTimeResponse<T>
{
    [JsonPropertyName("data")]
    public T? Data { get; set; }


}
