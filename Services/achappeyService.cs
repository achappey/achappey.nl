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

    private readonly AutoMapper.IMapper _mapper;

    private readonly string _wakatimeApiKey;

    private readonly string _duolingoApiKey;

    private readonly string _lastfmApiKey;

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

    private IEnumerable<Profile> baseProfiles = new List<Profile>() {
        new Profile() {
            Username = "achappey",
            Source = Source.DUOLINGO,
            Id = "https://duolingo.com/achappey",
            Url = "https://duolingo.com/achappey"
        },
        new Profile() {
            Username = "achappey",
            Source = Source.TWITTER,
            Id = "https://twitter.com/achappey",
            Url = "https://twitter.com/achappey"
        },

        new Profile() {
            Username = "achappey",
            Source = Source.LINKEDIN,
            Id = "https://nl.linkedin.com/in/achappey",
            Url = "https://nl.linkedin.com/in/achappey"
        }

    };

    public achappeyService(
        HttpClient client, Octokit.GitHubClient github, AutoMapper.IMapper mapper, WakaTimeClient wakaTime, IConfiguration config, LastfmClient lastfm)

    {
        _github = github;
        _mapper = mapper;
        _wakaTime = wakaTime;
        _httpClient = client;
        _lastfm = lastfm;

        this._wakatimeApiKey = config.GetValue<string>("WakaTime");
        this._duolingoApiKey = config.GetValue<string>("Duolingo");
        this._lastfmApiKey = config.GetValue<string>("Lastfm");
    }

    public async Task<IEnumerable<Profile>> GetProfiles()
    {
        List<Profile> profiles = new List<Profile>();

        var github = await this._github.User.Get(GITHUB_USERNAME);

        if (github != null)
        {
            profiles.Add(this._mapper.Map<Profile>(github));
        }

        var wakatime = await this._wakaTime.GetProfile(this._wakatimeApiKey);

        if (wakatime != null)
        {
            profiles.Add(this._mapper.Map<Profile>(wakatime));
        }

        var lastFm = await this._lastfm.GetUser(this._lastfmApiKey, LASTFM_USERNAME);

        if (lastFm != null)
        {
            profiles.Add(this._mapper.Map<Profile>(lastFm));
        }

        profiles.AddRange(baseProfiles);

        return profiles;
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

        if (this._duolingoApiKey != null)
        {
            var result = await this._httpClient.GetFromJsonAsync<IEnumerable<Language>>(
               string.Format("{1}/languages?x-api-key={0}", this._duolingoApiKey, DUOLINGONATOR));

            if (result != null)
            {
                languages.AddRange(result.OrderByDescending(g => g.Points));
            }
        }

        return languages;
    }

    public async Task<IEnumerable<Album>?> GetAlbums(string period = "7day")
    {
        var topArtists = await this._lastfm.GetTopAlbums(this._lastfmApiKey, LASTFM_USERNAME, period);

        return topArtists?.Select(a => this._mapper.Map<Album>(a));
    }

    private async Task<ActiveLanguage?> GetActiveLanguage()
    {
        if (this._duolingoApiKey != null)
        {
            return await this._httpClient.GetFromJsonAsync<ActiveLanguage>(
               string.Format("{1}/activeLanguage?x-api-key={0}", this._duolingoApiKey, DUOLINGONATOR));


        }

        return null;
    }

    private async Task<IEnumerable<Activity>> GetMusicActivity()
    {
        var items = new List<Activity>();

        var recentTracks = await this._lastfm.GetRecentTracks(this._lastfmApiKey, LASTFM_USERNAME);

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

        if (this._wakatimeApiKey != null)
        {
            var durationsYesterday = await this._wakaTime.GetHeartBeats(this._wakatimeApiKey, DateTime.Now.AddDays(-1));
            var durationsToday = await this._wakaTime.GetHeartBeats(this._wakatimeApiKey, DateTime.Now);

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

        }


        return items.GroupBy(v => v.Title).Select(b => b.OrderByDescending(z => z.CreatedAt).First());
    }
}
