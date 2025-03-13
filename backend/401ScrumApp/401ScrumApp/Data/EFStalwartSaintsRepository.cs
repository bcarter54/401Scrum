using _401ScrumApp.Data;
using _401ScrumApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _401ScrumApp.Data
{
    public class EFStalwartSaintsRepository : iStalwartSaintsRepository
    {
        private readonly StalwartSaintsDbContext _context;

        public EFStalwartSaintsRepository(StalwartSaintsDbContext context)
        {
            _context = context;
        }

        // Get Blessing Groups with count
        public async Task<IEnumerable<object>> GetBlessingCountsAsync()
        {
            return await _context.Verses
                .GroupBy(v => v.BlessingGroupID)
                .Select(g => new
                {
                    Name = _context.Blessings.Where(b => b.BlessingGroupID == g.Key).Select(b => b.BlessingGroup).FirstOrDefault(),
                    Count = g.Count()
                })
                .ToListAsync();
        }

        // Get Invitation Groups with count
        public async Task<IEnumerable<object>> GetInvitationCountsAsync()
        {
            return await _context.Verses
                .GroupBy(v => v.InvitationGroup)
                .Select(g => new
                {
                    Name = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<object>> GetInvitationCountsByBlessingAsync(string blessing)
        {
            return await _context.Verses
                .Where(v => v.BlessingGroupID == _context.Blessings
                    .Where(b => b.BlessingGroup == blessing)
                    .Select(b => b.BlessingGroupID)
                    .FirstOrDefault())
                .GroupBy(v => v.InvitationGroup)
                .Select(g => new { Name = g.Key, Count = g.Count() })
                .ToListAsync();
        }


        // Get Invitation Groups with count
        public async Task<IEnumerable<object>> GetInvitationRecordsAsync(string blessing)
        {
            return await _context.Verses
                .Where(v => v.BlessingGroupID ==
                    _context.Blessings.Where(b => b.BlessingGroup == blessing)
                    .Select(b => b.BlessingGroupID)
                    .FirstOrDefault()) // Ensure correct filtering
                .Select(v => new
                {
                    VerseLocation = v.VerseLocation,
                    Contents = v.Contents,
                    Invitation = v.InvitationGroup,
                    Blessing = _context.Blessings
                        .Where(b => b.BlessingGroupID == v.BlessingGroupID)
                        .Select(b => b.BlessingGroup)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }


        // Get Verses filtered by Blessing and Invitation
        public async Task<IEnumerable<Verse>> GetFilteredVersesAsync(string? blessing, string? invitation)
        {
            var query = _context.Verses.AsQueryable();

            if (!string.IsNullOrEmpty(blessing))
            {
                var blessingId = _context.Blessings
                    .Where(b => b.BlessingGroup == blessing)
                    .Select(b => b.BlessingGroupID)
                    .FirstOrDefault();

                if (blessingId != null)
                {
                    query = query.Where(v => v.BlessingGroupID == blessingId);
                }
            }

            if (!string.IsNullOrEmpty(invitation))
            {
                query = query.Where(v => v.InvitationGroup == invitation);
            }

            return await query.ToListAsync();
        }

    }
}

