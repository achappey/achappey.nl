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
        var data = await this.GetLastfmData<LastfmRecentTracksResponse>(apiKey, "user.getrecenttracks", string.Format("user={0}", username));

        return data?.RecentTracks?.Track;
    }

    public async Task<IEnumerable<TopAlbum>?> GetTopAlbums(string apiKey, string username)
    {
        var data = await this.GetLastfmData<LastfmTopAlbumsResponse>(apiKey, "user.gettopalbums", string.Format("user={0}", username));

        return data?.TopAlbums?.Album;
    }
    
    private async Task<T?> GetLastfmData<T>(string apiKey, string method, string query)
    {
        return await this._httpClient.GetFromJsonAsync<T>(
            string.Format("{0}?method={1}&api_key={2}&format=json&{3}", BaseAddress, method, apiKey, query));
    }

}
