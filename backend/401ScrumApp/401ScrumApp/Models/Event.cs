using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace _401ScrumApp.Models
{
    public class Event
    {
        [Key]
        public int EventID { get; set; }

        [Required]
        public int StudyGroupID { get; set; }

        [ForeignKey("StudyGroupID")]
        public StudyGroup StudyGroup { get; set; }

        [Required]
        public string Topic { get; set; }

        public string Location { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }
    }
}
