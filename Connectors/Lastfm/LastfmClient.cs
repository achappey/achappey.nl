using achappey.Connectors.Lastfm.Models;

namespace achappey.Connectors.Lastfm;

public class LastfmClient
{
    private readonly HttpClient _httpClient = null!;

    private const string BaseAddress = "http://ws.audioscrobbler.com/2.0/";

    public LastfmClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<Track>?> GetRecentTracks(string apiKey, string username)
    {
        var data = await this._httpClient.GetFromJsonAsync<LastfmRecentTracksResponse>(
            string.Format("{0}?method=user.getrecenttracks&user={1}&api_key={2}&format=json", BaseAddress, username, apiKey));

        return data?.RecentTracks?.Track;

    }

}
