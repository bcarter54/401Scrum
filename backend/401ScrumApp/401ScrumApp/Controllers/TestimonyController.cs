using Microsoft.AspNetCore.Mvc;
using System.Linq;
using _401ScrumApp.Data;

namespace _401ScrumApp.Controllers
{
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
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest(new { error = "Username is required." });

            var verses = (from v in _context.Verses
                          join l in _context.Likes on v.VerseID equals l.VerseID
                          where l.Username == username
                          select new
                          {
                              verse = v.VerseLocation,
                              invitation = v.Invitation,
                              blessing = v.Blessing,
                              contents = v.Contents
                          }).ToList();

            return Ok(verses);
        }

        [HttpGet("videos")]
        public IActionResult GetLikedVideos([FromQuery] string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest(new { error = "Username is required." });

            var videos = (from v in _context.Videos
                          join l in _context.Likes on v.VideoID equals l.VideoID
                          where l.Username == username
                          select new
                          {
                              url = v.URL
                          }).ToList();

            return Ok(videos);
        }

        [HttpGet("events")]
        public IActionResult GetEvents()
        {
            var events = _context.Events
                .OrderBy(e => e.Date)
                .Select(e => new
                {
                    e.EventID,
                    e.Topic,
                    e.Location,
                    date = e.Date.ToString("yyyy-MM-dd"),
                    time = e.Time.ToString(@"hh\:mm")
                })
                .ToList();

            return Ok(events);
        }
    }
}
