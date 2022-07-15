using AutoMapper;
using achappey.Models;
using achappey.Connectors.WakaTime;

namespace achappey.Services;

public class achappeyService
{
    private readonly Octokit.GitHubClient _github;

    private readonly WakaTimeClient _wakaTime;

    private readonly HttpClient _httpClient;

    private readonly IMapper _mapper;

    private readonly IConfiguration _config;

    private const string DUOLINGONATOR = "https://duolingonator.net/api";

    private IEnumerable<Language> baseLanguages = new List<Language>() {
        new Language() {
            Code = "nl",
            Name = "Dutch",
            Points = 999999,
            Level = 27
        },
        new Language() {
            Code = "gb",
            Name = "English",
            Points = 100000,
            Level = 26
        }

    };

    public achappeyService(
        HttpClient client, Octokit.GitHubClient github, IMapper mapper, WakaTimeClient wakaTime, IConfiguration config)

    {
        _github = github;
        _mapper = mapper;
        _wakaTime = wakaTime;
        _config = config;
        _httpClient = client;
    }

    public async Task<IEnumerable<Repository>> GetRepositories()
    {
        var items = await this._github.Repository.GetAllForUser("achappey");

        return items
        .OrderByDescending(a => a.UpdatedAt)
        .Select(t => this._mapper.Map<Repository>(t));
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

    public async Task<ActiveLanguage?> GetActiveLanguage()
    {
        var key = this._config.GetValue<string>("Duolingo");

        if (key != null)
        {
            return await this._httpClient.GetFromJsonAsync<ActiveLanguage>(
               string.Format("{1}/activeLanguage?x-api-key={0}", key, DUOLINGONATOR));
        }

        return null;
    }
}
