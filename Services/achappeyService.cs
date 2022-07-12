using AutoMapper;
using achappey.Models;

namespace achappey.Services;

public class achappeyService
{
    private readonly Octokit.GitHubClient _github;
    private readonly IMapper _mapper;
    

    public achappeyService(
        HttpClient client, Octokit.GitHubClient github, IMapper mapper)
        
    {
        _github = github;
        _mapper = mapper;
    }

    public async Task<IEnumerable<Repository>> GetRepositories()
    {
        var items = await this._github.Repository.GetAllForUser("achappey");

        return items.Select(t => this._mapper.Map<Repository>(t));
    }

}
