using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class Like
    {
        [Key]
        public int LikeID { get; set; }

        [Required]
        public string Username { get; set; }

        [ForeignKey("Username")]
        public User User { get; set; }

        public int? VerseID { get; set; }

        [ForeignKey("VerseID")]
        public Verse Verse { get; set; }

        public int? VideoID { get; set; }

        [ForeignKey("VideoID")]
        public Video Video { get; set; }
    }
}
