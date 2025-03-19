using _401ScrumApp.Models;
using Microsoft.EntityFrameworkCore;

namespace _401ScrumApp.Data
{
    public class StalwartSaintsDbContext : DbContext
    {
        public StalwartSaintsDbContext(DbContextOptions<StalwartSaintsDbContext> options) : base(options) { }

        public DbSet<Verse> Verses { get; set; }
        public DbSet<Blessing> Blessings { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<StudyGroup> StudyGroups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Like> Likes { get; set; }
    }
}
