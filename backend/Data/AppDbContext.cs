using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<Genre> Genres {get; set;}

        public DbSet<Log> Logs {get; set;}

        public DbSet<Room> Rooms { get; set; }
        
        public DbSet<UserEmails> UserEmails { get; set; }

        public DbSet<Community> Community { get; set; }
       
    }
}