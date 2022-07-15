using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActiveLanguageController : ControllerBase
{
    private readonly ILogger<ActiveLanguageController> _logger;

    private readonly achappeyService _achappeyService;

    public ActiveLanguageController(ILogger<ActiveLanguageController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetActiveLanguage")]
    [EnableQuery]
    public async Task<ActiveLanguage?> Get()
    {
        return await _achappeyService.GetActiveLanguage();
    }
}
