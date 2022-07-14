using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LanguagesController : ControllerBase
{
    private readonly ILogger<LanguagesController> _logger;

    private readonly achappeyService _achappeyService;

    public LanguagesController(ILogger<LanguagesController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetLanguages")]
    [EnableQuery]
    public async Task<IEnumerable<Language>?> Get()
    {
        return await _achappeyService.GetLanguages();
    }
}
