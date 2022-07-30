using achappey.Connectors.Duolingo.Models;

namespace achappey.Connectors.Duolingo;


public class DuolingoClient
{
    private readonly HttpClient _httpClient = null!;

    private readonly string _duolingoApiKey;

    public static readonly string DUOLINGO_URL = "https://duolingo.com";

    private const string DUOLINGONATOR = "https://duolingonator.net/api";

    public DuolingoClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;

        this._duolingoApiKey = config.GetValue<string>("Duolingo");
    }

    public async Task<IEnumerable<Language>?> GetLanguages()
    {
        if (this._duolingoApiKey != null)
        {
            return await this._httpClient.GetFromJsonAsync<IEnumerable<Language>>(
               string.Format("{1}/languages?x-api-key={0}", this._duolingoApiKey, DUOLINGONATOR));
        }

        return null;
    }

    public async Task<ActiveLanguage?> GetActiveLanguage()
    {
        if (this._duolingoApiKey != null)
        {
            return await this._httpClient.GetFromJsonAsync<ActiveLanguage>(
               string.Format("{1}/activeLanguage?x-api-key={0}", this._duolingoApiKey, DUOLINGONATOR));
        }

        return null;
    }

    public async Task<User?> GetUser()
    {
        if (this._duolingoApiKey != null)
        {
            return await this._httpClient.GetFromJsonAsync<User>(
               string.Format("{1}/profile?x-api-key={0}", this._duolingoApiKey, DUOLINGONATOR));
        }

        return null;
    }
}


