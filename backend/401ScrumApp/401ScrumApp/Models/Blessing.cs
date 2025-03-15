using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class Blessing
    {
        [Key]
        public int BlessingGroupID { get; set; }

        [Required]
        public string BlessingGroup { get; set; }
    }
}
