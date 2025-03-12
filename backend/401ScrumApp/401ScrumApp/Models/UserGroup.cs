using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class UserGroup
    {
        [Key]
        public int UserGroupID { get; set; }

        [Required]
        public string Username { get; set; }

        [ForeignKey("Username")]
        public User User { get; set; }

        [Required]
        public int StudyGroupID { get; set; }

        [ForeignKey("StudyGroupID")]
        public StudyGroup StudyGroup { get; set; }
    }
}
