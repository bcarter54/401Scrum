using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using _401ScrumApp.Data;

namespace _401ScrumApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlessingsController : ControllerBase
    {
        private readonly iStalwartSaintsRepository _repo;

        public BlessingsController(iStalwartSaintsRepository repo)
        {
            _repo = repo;
        }

        // Get Blessing Groups with count
        [HttpGet("blessings/count")]
        public async Task<IActionResult> GetBlessingCounts()
        {
            var blessings = await _repo.GetBlessingCountsAsync();
            return Ok(blessings);
        }

        // Get Invitation Groups with count
        [HttpGet("invitations/count")]
        public async Task<IActionResult> GetInvitationCounts()
        {
            var invitations = await _repo.GetInvitationCountsAsync();
            return Ok(invitations);
        }

        // Get verses filtered by Blessing & Invitation
        [HttpGet("verses")]
        public async Task<IActionResult> GetFilteredVerses([FromQuery] string blessing, [FromQuery] string invitation)
        {
            var verses = await _repo.GetFilteredVersesAsync(blessing, invitation);
            return Ok(verses);
        }
    }
}
