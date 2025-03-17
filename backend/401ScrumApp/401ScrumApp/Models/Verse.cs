using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class Verse
    {
        [Key]
        public int VerseID { get; set; }

        [Required]
        public string VerseLocation { get; set; }

        public string Contents { get; set; }

        public string Invitation { get; set; }

        public string InvitationGroup { get; set; }

        public string Blessing { get; set; }

        public int BlessingGroupID { get; set; }

        public bool Approved { get; set; }
    }
}
