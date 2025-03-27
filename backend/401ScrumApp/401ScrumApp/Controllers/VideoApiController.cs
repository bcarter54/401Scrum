using _401ScrumApp.Data;

namespace _401ScrumApp.Controllers;

using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class VideoApiController : ControllerBase
{
    private readonly StalwartSaintsDbContext _context;

    public VideoApiController(StalwartSaintsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllVideos()
    {
        var videos = _context.Videos.ToList();
        return Ok(videos);
    }
}
