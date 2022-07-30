using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfilesController : ControllerBase
{
    private readonly ILogger<ProfilesController> _logger;

    private readonly achappeyService _achappeyService;

    public ProfilesController(ILogger<ProfilesController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetProfiles")]
    [EnableQuery]
    public async Task<IEnumerable<Profile>> Get()
    {
        return await _achappeyService.GetProfiles();
    }
}
