namespace _401ScrumApp.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Linq;
using _401ScrumApp.Data;
using _401ScrumApp.Models;

[ApiController]
[Route("api/testimony")]
public class TestimonyController : ControllerBase
{
    private readonly StalwartSaintsDbContext _context;

    public TestimonyController(StalwartSaintsDbContext context)
    {
        _context = context;
    }

    [HttpGet("verses")]
    public IActionResult GetLikedVerses()
    {
        var verses = from v in _context.Verses
            join l in _context.Likes on v.VerseID equals l.VerseID
            select new {
                v.VerseID,
                v.VerseLocation,
                v.Invitation,
                v.Blessing
            };
        return Ok(verses);
    }

    [HttpGet("videos")]
    public IActionResult GetLikedVideos()
    {
        var videos = from v in _context.Videos
            join l in _context.Likes on v.VideoID equals l.VideoID
            select new {
                v.VideoID,
                v.URL
            };
        return Ok(videos);
    }

    [HttpGet("events")]
    public IActionResult GetEvents()
    {
        var events = from e in _context.Events
            select new {
                e.EventID,
                e.Topic,
                e.Location,
                e.Date,
                e.Time
            };
        return Ok(events);
    }
}