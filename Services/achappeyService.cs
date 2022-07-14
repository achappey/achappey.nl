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

        return items.Select(t => this._mapper.Map<Repository>(t));
    }

    public async Task<IEnumerable<Language>?> GetLanguages()
    {
        var key = this._config.GetValue<string>("Duolingo");

        if (key != null)
        {
            var result = await this._httpClient.GetFromJsonAsync<IEnumerable<Language>>(
               string.Format("https://duolingonator.net/api/languages?x-api-key={0}", key));

               return result?.OrderByDescending(g => g.Points);
        }

        return null;
    }
}
