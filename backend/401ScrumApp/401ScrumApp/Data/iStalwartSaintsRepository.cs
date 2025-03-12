using System.Collections.Generic;
using System.Threading.Tasks;
using _401ScrumApp.Models;

namespace _401ScrumApp.Data
{
    public interface iStalwartSaintsRepository
    {
        // Fetch Blessings grouped with count
        Task<IEnumerable<object>> GetBlessingCountsAsync();

        // Fetch Invitations grouped with count
        Task<IEnumerable<object>> GetInvitationCountsAsync();

        // Fetch verses filtered by Blessing and/or Invitation Group
        Task<IEnumerable<Verse>> GetFilteredVersesAsync(string blessing, string invitation);
    }
}
