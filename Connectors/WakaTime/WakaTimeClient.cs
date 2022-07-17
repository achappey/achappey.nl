using achappey.Connectors.WakaTime.Models;

namespace achappey.Connectors.WakaTime;

public class WakaTimeClient
{
    private readonly HttpClient _httpClient = null!;

    private const string BaseAddress = "https://wakatime.com";

    public WakaTimeClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<HeartBeat>> GetHeartBeats(string apiKey, DateTime date)
    {
        var json = await GetData<HeartBeatData>(apiKey, string.Format("/api/v1/users/current/heartbeats?date={0}", date.ToString("o")));

        return json != null && json.Data != null ? json.Data : new List<HeartBeat>();
    }

    public async Task<IEnumerable<Duration>> GetDurations(string apiKey, DateTime date)
    {
        var json = await GetData<DurationData>(apiKey, string.Format("/api/v1/users/current/durations?date={0}&slice_by=category", date.ToString("o")));

        return json != null && json.Data != null ? json.Data : new List<Duration>();
    }

    private async Task<T?> GetData<T>(string apiKey, string url)
    {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(apiKey);

        var httpRequestMessage = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(BaseAddress + url),
            Headers = {
                { System.Net.HttpRequestHeader.Accept.ToString(), "application/json" },
                { System.Net.HttpRequestHeader.ContentType.ToString(), "application/json" },
                { "Authorization", string.Format("Basic {0}", System.Convert.ToBase64String(plainTextBytes)) }
            }
        };

        var getUserDataResult = await _httpClient.SendAsync(httpRequestMessage);

        getUserDataResult.EnsureSuccessStatusCode();

        return await getUserDataResult.Content.ReadFromJsonAsync<T>();
    }


}
