using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using achappey.Services;
using achappey.Models;

namespace achappey.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController : ControllerBase
{
    private readonly ILogger<AlbumsController> _logger;

    private readonly achappeyService _achappeyService;

    public AlbumsController(ILogger<AlbumsController> logger, achappeyService achappeyService)
    {
        _logger = logger;
        _achappeyService = achappeyService;
    }

    [HttpGet(Name = "GetAlbums")]
    [EnableQuery]
    public async Task<IEnumerable<Album>?> Get(string? period = "7day")
    {
        return await _achappeyService.GetAlbums(period: period != null ? period : "7day");
    }
}
