using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
         public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the relationship between User and UserRole
            modelBuilder.Entity<User>()
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.UserId);

            // Define the relationship between Role and UserRole
            modelBuilder.Entity<Role>()
                .HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId);

            // Define the composite primary key for UserRole
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });


            //seed table Roles with two roles: "User" and "Admin"
             modelBuilder.Entity<Role>().HasData(
             new Role { Id = 1, Name = "User" },
             new Role { Id = 2, Name = "Admin" }
             );
        }
    }
}