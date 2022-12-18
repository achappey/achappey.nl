using achappey.Models;
using achappey.Connectors.WakaTime;
using achappey.Connectors.Lastfm;
using achappey.Connectors.Duolingo;
using achappey.Extensions;
using System.Globalization;

namespace achappey.Services;

public class achappeyService
{
    private readonly Octokit.GitHubClient _github;

    private readonly WakaTimeClient _wakaTime;

    private readonly DuolingoClient _duolingo;

    private readonly LastfmClient _lastfm;

    private readonly HttpClient _httpClient;

    private readonly AutoMapper.IMapper _mapper;

    private readonly string _wakatimeApiKey;

    private readonly string _lastfmApiKey;

    private const string GITHUB_USERNAME = "achappey";

    private const string LASTFM_USERNAME = "achappey";

    public achappeyService(HttpClient client,
    Octokit.GitHubClient github,
    AutoMapper.IMapper mapper,
    WakaTimeClient wakaTime,
    IConfiguration config,
    LastfmClient lastfm,
    DuolingoClient duolingo)

    {
        _github = github;
        _mapper = mapper;
        _wakaTime = wakaTime;
        _httpClient = client;
        _lastfm = lastfm;
        _duolingo = duolingo;

        this._wakatimeApiKey = config.GetValue<string>("WakaTime");
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

        var duolingo = await this._duolingo.GetUser();

        if (duolingo != null)
        {
            profiles.Add(this._mapper.Map<Profile>(duolingo));
        }

        profiles.AddRange(NetworkExtensions.BaseProfiles);

        return profiles.OrderBy(a => a.Network);
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

        var activeLanguage = await this._duolingo.GetActiveLanguage();

        if (activeLanguage != null)
        {
            mappedEvents.AddRange(this._mapper.Map<IEnumerable<Activity>>(activeLanguage));
        }

        return mappedEvents
        .OrderByDescending(a => a.CreatedAt);
    }

    public async Task<IEnumerable<Language>> GetLanguages()
    {
        var languages = NetworkExtensions.BaseLanguages.ToList();

        var result = await this._duolingo.GetLanguages();

        if (result != null)
        {
            languages.AddRange(
                result.OrderByDescending(g => g.Points)
                .Select(a => this._mapper.Map<Language>(a)));
        }

        return languages;
    }

    public async Task<IEnumerable<Album>?> GetAlbums(string period = "7day")
    {
        var items = await this._lastfm.GetTopAlbums(this._lastfmApiKey, LASTFM_USERNAME, period);

        return items?.Select(a => this._mapper.Map<Album>(a));
    }

    public async Task<Dictionary<int, CodingActivitiy>?> GetCoding()
    {
        var items = await this._wakaTime.GetSummaries(this._wakatimeApiKey, DateTime.Now.AddDays(-27).StartOfWeek(DayOfWeek.Monday), DateTime.Now);

        return items?.GroupBy(a => ISOWeek.GetWeekOfYear(DateTime.Parse(a.Range.Date)))
            .ToDictionary(a => a.Key, a => new CodingActivitiy()
            {
                Languages = a.SelectMany(z => z.Languages).GroupBy(y => y.Name).Select(k =>
                new CodingTime()
                {
                    Name = k.Key,
                    Seconds = k.Sum(z => z.TotalSeconds)
                }),
                Editors = a.SelectMany(z => z.Editors).GroupBy(y => y.Name).Select(k =>
                new CodingTime()
                {
                    Name = k.Key,
                    Seconds = k.Sum(z => z.TotalSeconds)
                })

            });
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
