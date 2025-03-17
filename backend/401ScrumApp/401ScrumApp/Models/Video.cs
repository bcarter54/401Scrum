using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class Video
    {
        [Key]
        public int VideoID { get; set; }

        [Required]
        public string URL { get; set; }

        public int BlessingGroupID { get; set; }

        public bool Approved { get; set; }
    }
}
