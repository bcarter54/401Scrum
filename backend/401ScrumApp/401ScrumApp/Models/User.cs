using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
