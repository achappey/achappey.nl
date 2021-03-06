using AutoMapper;
using achappey.Models;
using achappey.Connectors.WakaTime;
using achappey.Connectors.Lastfm;

namespace achappey.Services;

public class achappeyService
{
    private readonly Octokit.GitHubClient _github;

    private readonly WakaTimeClient _wakaTime;
    private readonly LastfmClient _lastfm;

    private readonly HttpClient _httpClient;

    private readonly IMapper _mapper;

    private readonly IConfiguration _config;

    private const string GITHUB_USERNAME = "achappey";
    
    private const string LASTFM_USERNAME = "achappey";

    private const string DUOLINGONATOR = "https://duolingonator.net/api";

    private IEnumerable<Language> baseLanguages = new List<Language>() {
        new Language() {
            Code = "nl",
            Name = "Dutch",
            Description = "Native",
            Points = 999999,
            Level = 99
        },
        new Language() {
            Code = "gb",
            Name = "English",
            Description = "Professional",
            Points = 100000,
            Level = 75
        }

    };

    public achappeyService(
        HttpClient client, Octokit.GitHubClient github, IMapper mapper, WakaTimeClient wakaTime, IConfiguration config, LastfmClient lastfm)

    {
        _github = github;
        _mapper = mapper;
        _wakaTime = wakaTime;
        _config = config;
        _httpClient = client;
        _lastfm = lastfm;
    }

    public async Task<IEnumerable<Repository>> GetRepositories()
    {
        var items = await this._github.Repository.GetAllForUser(GITHUB_USERNAME);

        return items
        .OrderByDescending(a => a.UpdatedAt)
        .Select(t => this._mapper.Map<Repository>(t));
    }

    public async Task<IEnumerable<Activity>> GetActivities()
    {
        var eventItems = await this._github.Activity.Events.GetAllUserPerformed(GITHUB_USERNAME);

        var mappedEvents = eventItems
        .Select(t => this._mapper.Map<Activity>(t))
        .ToList();

        mappedEvents.AddRange(await this.GetMusicActivity());
        mappedEvents.AddRange(await this.GetCodingActivity());

        var activeLanguage = await this.GetActiveLanguage();

        if (activeLanguage != null)
        {
            mappedEvents.AddRange(this._mapper.Map<IEnumerable<Activity>>(activeLanguage));
        }

        return mappedEvents
        .OrderByDescending(a => a.CreatedAt);
    }

    public async Task<IEnumerable<Language>> GetLanguages()
    {
        var languages = baseLanguages.ToList();

        var key = this._config.GetValue<string>("Duolingo");

        if (key != null)
        {
            var result = await this._httpClient.GetFromJsonAsync<IEnumerable<Language>>(
               string.Format("{1}/languages?x-api-key={0}", key, DUOLINGONATOR));

            if (result != null)
            {
                languages.AddRange(result.OrderByDescending(g => g.Points));
            }
        }

        return languages;
    }

    public async Task<IEnumerable<Album>?> GetAlbums(string period)
    {
        var topArtists = await this._lastfm.GetTopAlbums(this._config.GetValue<string>("Lastfm"), LASTFM_USERNAME, period);

        return topArtists?.Select(a => this._mapper.Map<Album>(a));
    }

    private async Task<ActiveLanguage?> GetActiveLanguage()
    {
        var key = this._config.GetValue<string>("Duolingo");

        if (key != null)
        {
            return await this._httpClient.GetFromJsonAsync<ActiveLanguage>(
               string.Format("{1}/activeLanguage?x-api-key={0}", key, DUOLINGONATOR));


        }

        return null;
    }

    private async Task<IEnumerable<Activity>> GetMusicActivity()
    {
        var items = new List<Activity>();

        var recentTracks = await this._lastfm.GetRecentTracks(this._config.GetValue<string>("Lastfm"), LASTFM_USERNAME);

        if (recentTracks != null)
        {
            items.AddRange(
                recentTracks
                    .Select(a => this._mapper.Map<Activity>(a)));
        }

        return items;
    }

    private async Task<IEnumerable<Activity>> GetCodingActivity()
    {
        var items = new List<Activity>();

        var durationsYesterday = await this._wakaTime.GetHeartBeats(this._config.GetValue<string>("WakaTime"), DateTime.Now.AddDays(-1));
        var durationsToday = await this._wakaTime.GetHeartBeats(this._config.GetValue<string>("WakaTime"), DateTime.Now);

        if (durationsYesterday != null)
        {
            items.AddRange(
                durationsYesterday
                    .Where(t => !string.IsNullOrWhiteSpace(t.Language))
                    .Select(a => this._mapper.Map<Activity>(a)));
        }

        if (durationsToday != null)
        {
            items.AddRange(
                durationsToday
                    .Where(t => !string.IsNullOrWhiteSpace(t.Language))
                    .Select(a => this._mapper.Map<Activity>(a)));
        }

        return items.GroupBy(v => v.Title).Select(b => b.OrderByDescending(z => z.CreatedAt).First());
    }
}
