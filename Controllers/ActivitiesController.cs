using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly ILogger<ActivitiesController> _logger;

    private readonly achappeyService _achappeyService;

    public ActivitiesController(ILogger<ActivitiesController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetActivities")]
    [EnableQuery]
    public async Task<IEnumerable<Activity>> Get()
    {
        return await _achappeyService.GetActivities();
    }
}
