using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepositoriesController : ControllerBase
{
    private readonly ILogger<RepositoriesController> _logger;

    private readonly achappeyService _achappeyService;

    public RepositoriesController(ILogger<RepositoriesController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetRepositories")]
    [EnableQuery]
    public async Task<IEnumerable<Repository>> Get()
    {
        return await _achappeyService.GetRepositories();
    }
}
