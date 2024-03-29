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
        var json = await GetData<WakaTimeResponse<IEnumerable<HeartBeat>>>(apiKey,
            $"/api/v1/users/current/heartbeats?date={date.ToString("o")}");

        return json != null && json.Data != null ? json.Data : throw new Exception();
    }

    public async Task<IEnumerable<Duration>> GetDurations(string apiKey, DateTime date)
    {
        var json = await GetData<WakaTimeResponse<IEnumerable<Duration>>>(apiKey,
            $"/api/v1/users/current/durations?date={date.ToString("o")}&slice_by=category");

        return json != null && json.Data != null ? json.Data : throw new Exception();
    }

    public async Task<IEnumerable<Summary>> GetSummaries(string apiKey, DateTime startDate, DateTime endDate)
    {
        var json = await GetData<WakaTimeResponse<IEnumerable<Summary>>>(apiKey,
            $"/api/v1/users/current/summaries?start={startDate.ToString("o")}&end={endDate.ToString("o")}");

        return json != null && json.Data != null ? json.Data : throw new Exception();
    }

    public async Task<User> GetProfile(string apiKey)
    {
        var json = await GetData<WakaTimeResponse<User>>(apiKey, "/api/v1/users/current");

        return json != null && json.Data != null ? json.Data : throw new Exception();
    }

    private async Task<T?> GetData<T>(string apiKey, string url)
    {
        var httpRequestMessage = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(BaseAddress + url),
            Headers = {
                { System.Net.HttpRequestHeader.Accept.ToString(), "application/json" },
                { System.Net.HttpRequestHeader.ContentType.ToString(), "application/json" },
                { "Authorization",  $"Basic {Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(apiKey))}" }
            }
        };

        var getUserDataResult = await _httpClient.SendAsync(httpRequestMessage);

        getUserDataResult.EnsureSuccessStatusCode();

        return await getUserDataResult.Content.ReadFromJsonAsync<T>();
    }
}


