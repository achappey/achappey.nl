using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CodingController : ControllerBase
{
    private readonly ILogger<CodingController> _logger;

    private readonly achappeyService _achappeyService;

    public CodingController(ILogger<CodingController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetCoding")]
    [EnableQuery]
    public async Task<Dictionary<int, CodingActivitiy>?> Get()
    {
        return await _achappeyService.GetCoding();
    }
}
