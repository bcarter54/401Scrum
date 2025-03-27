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
    public IActionResult GetLikedVerses([FromQuery] string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return BadRequest("Username is required.");
        }

        var verses = (from v in _context.Verses
                      join l in _context.Likes on v.VerseID equals l.VerseID
                      where l.Username == username
                      select new {
                          v.VerseID,
                          v.VerseLocation,
                          v.Invitation,
                          v.Blessing,
                          v.Contents
                      }).ToList();

        return Ok(verses);
    }

    [HttpGet("videos")]
    public IActionResult GetLikedVideos([FromQuery] string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return BadRequest("Username is required.");
        }

        var videos = (from v in _context.Videos
                      join l in _context.Likes on v.VideoID equals l.VideoID
                      where l.Username == username
                      select new {
                          v.VideoID,
                          //v.Title,      
                          v.URL
                      }).ToList();      // ✅ Ensure it's returned as a list

        return Ok(videos);
    }

    [HttpGet("events")]
    public IActionResult GetEvents()
    {
        var events = (from e in _context.Events
                      select new {
                          e.EventID,
                          e.Topic,
                          e.Location,
                          e.Date,
                          e.Time
                      }).ToList();     // ✅ Materialize as a list

        return Ok(events);
    }
}
