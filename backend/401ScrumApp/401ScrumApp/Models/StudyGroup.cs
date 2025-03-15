using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class StudyGroup
    {
        [Key]
        public int StudyGroupID { get; set; }

        [Required]
        public string GroupName { get; set; }

        public bool Approved { get; set; }
    }
}
