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

        // Fetch Invitation Counts filtered by Blessing
        Task<IEnumerable<object>> GetInvitationCountsByBlessingAsync(string blessing);


        // Fetch Invitation Records filtered by Blessing Group
        Task<IEnumerable<object>> GetInvitationRecordsAsync(string blessing);


        // Fetch verses filtered by Blessing and/or Invitation Group
        Task<IEnumerable<Verse>> GetFilteredVersesAsync(string blessing, string invitation);



        // Fetch Blessing Counts filtered by Invitation
        Task<IEnumerable<object>> GetBlessingCountsByInvitationAsync(string invitation);

        

        Task<IEnumerable<StudyGroup>> GetPendingStudyGroupsAsync();
        
        Task<IEnumerable<Verse>> GetPendingVersesAsync();
        
        // Add this method to the iStalwartSaintsRepository interface

        Task<StudyGroup> GetStudyGroupByIdAsync(int studyGroupId);

        Task<bool> UpdateStudyGroupAsync(StudyGroup studyGroup);


        // Fetch study groups with their related events
        Task<IEnumerable<object>> GetStudyGroupsWithEventsAsync();

        // Allow a user to join a study group
        Task<bool> JoinStudyGroupAsync(string username, int studyGroupId);

        Task<bool> VerseExistsAsync(string verseLocation, string invitationGroup, int blessingGroupID);
        Task AddVerseAsync(Verse verse);

        Task<IEnumerable<string>> GetUniqueInvitationGroupsAsync();
        Task<IEnumerable<string>> GetUniqueBlessingGroupsAsync();

        Task<bool> DeleteStudyGroupAsync(int studyGroupId);
        
        Task AddStudyGroupAsync(StudyGroup studyGroup);
        
        Task<Verse> GetVerseByIdAsync(int verseID);
        Task<bool> UpdateVerseAsync(Verse updatedVerse);

    }

}
