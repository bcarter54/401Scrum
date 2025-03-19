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
        public async Task<IActionResult> GetBlessingCounts([FromQuery] string? invitation = null)
        {
            if (string.IsNullOrEmpty(invitation))
            {
                var blessings = await _repo.GetBlessingCountsAsync();
                return Ok(blessings);
            }
            else
            {
                var filteredBlessings = await _repo.GetBlessingCountsByInvitationAsync(invitation);
                return Ok(filteredBlessings);
            }
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

        // Add this method to the BlessingsController class

        [HttpGet("studygroups/{StudyGroupID}")]
        public async Task<IActionResult> GetStudyGroupById(int StudyGroupID)
        {
            // Query the repository to get the specific study group
            var studyGroup = await _repo.GetStudyGroupByIdAsync(StudyGroupID);

            // If the study group doesn't exist, return a 404 response
            if (studyGroup == null)
            {
                return NotFound(new { message = "Study group not found" });
            }

            // Return the study group data as JSON
            return Ok(studyGroup);
        }
        
        [HttpPut("studygroups/{StudyGroupID}")]
        public async Task<IActionResult> UpdateStudyGroup(int StudyGroupID, [FromBody] StudyGroup updatedStudyGroup)
        {
            if (updatedStudyGroup == null || StudyGroupID != updatedStudyGroup.StudyGroupID)
            {
                return BadRequest(new { message = "Invalid study group data." });
            }

            var existingStudyGroup = await _repo.GetStudyGroupByIdAsync(StudyGroupID);
            if (existingStudyGroup == null)
            {
                return NotFound(new { message = "Study group not found." });
            }

            // Update properties
            existingStudyGroup.GroupName = updatedStudyGroup.GroupName;
            existingStudyGroup.Approved = updatedStudyGroup.Approved;

            bool success = await _repo.UpdateStudyGroupAsync(existingStudyGroup);

            if (!success)
            {
                return StatusCode(500, new { message = "Failed to update study group." });
            }

            return Ok(new { message = "Study group updated successfully." });
        }

        [HttpPost("add-verse")]
        public async Task<IActionResult> AddVerse([FromBody] Verse newVerse)
        {
            if (newVerse == null)
                return BadRequest("Invalid request: Missing verse data.");

            bool exists = await _repo.VerseExistsAsync(newVerse.VerseLocation, newVerse.InvitationGroup, newVerse.BlessingGroupID);

            if (exists)
                return Conflict(new { message = "A verse with this combination already exists." });

            newVerse.Approved = false; // Default approval
            await _repo.AddVerseAsync(newVerse);

            return CreatedAtAction(nameof(GetFilteredVerses), new { verseLocation = newVerse.VerseLocation }, newVerse);
        }

        // Get all unique Invitation Groups from the Verses table
        [HttpGet("invitations/groups")]
        public async Task<IActionResult> GetInvitationGroups()
        {
            var invitationGroups = await _repo.GetUniqueInvitationGroupsAsync();
            return Ok(invitationGroups);
        }

        // Get all Blessing Groups from the Blessings table
        [HttpGet("blessings/groups")]
        public async Task<IActionResult> GetBlessingGroups()
        {
            var blessingGroups = await _repo.GetUniqueBlessingGroupsAsync();
            return Ok(blessingGroups);
        }



    }
}
