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
        var data = await this.GetLastfmData<LastfmRecentTracksResponse>(apiKey, "user.getrecenttracks", $"user={username}");

        return data?.RecentTracks?.Track;
    }

    public async Task<IEnumerable<TopAlbum>?> GetTopAlbums(string apiKey, string username, string period = "7day")
    {
        var response = await this.GetLastfmData<LastfmTopAlbumsResponse>(apiKey, "user.gettopalbums", $"user={username}&period={period}");
        return response?.TopAlbums?.Album;
    }


    public async Task<User?> GetUser(string apiKey, string username)
    {
        var data = await this.GetLastfmData<LastfmUserResponse>(apiKey, "user.getinfo", $"user={username}");

        return data?.User;
    }

    private async Task<T?> GetLastfmData<T>(string apiKey, string method, string query)
    {
        return await this._httpClient.GetFromJsonAsync<T>($"{BaseAddress}?method={method}&api_key={apiKey}&format=json&{query}");
    }

}
