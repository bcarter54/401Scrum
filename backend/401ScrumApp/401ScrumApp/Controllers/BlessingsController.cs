using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using _401ScrumApp.Data;
using _401ScrumApp.Models;

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

        [HttpGet("invitations/count")]
        public async Task<IActionResult> GetInvitationCounts([FromQuery] string? blessing = null)
        {
            if (string.IsNullOrEmpty(blessing))
            {
                var invitations = await _repo.GetInvitationCountsAsync(); // Fetch all invitation counts
                return Ok(invitations);
            }
            else
            {
                var filteredInvitations = await _repo.GetInvitationCountsByBlessingAsync(blessing); // Fetch filtered counts
                return Ok(filteredInvitations);
            }
        }

        // Get verses filtered by Blessing & Invitation
        [HttpGet("verses")]
        public async Task<IActionResult> GetFilteredVerses([FromQuery] string? blessing = null, [FromQuery] string? invitation = null)
        {
            var verses = await _repo.GetFilteredVersesAsync(blessing, invitation);
            return Ok(verses);
        }
        
        [HttpGet("studygroups/pending")]
        public async Task<IActionResult> GetPendingStudyGroups()
        {
            var studyGroups = await _repo.GetPendingStudyGroupsAsync();
            return Ok(studyGroups);
        }


    }
}
