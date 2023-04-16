using System;
using System.Linq;
using backend.Models;
using backend.Data;
using BCrypt.Net;

namespace backend
{
    public static class DbSeed
    {
        public static void Seed(AppDbContext context)
        {
            // Check if there are already users in the database
            if (context.Users.Any())
            {
                return;
            }

            // Seed 10 users
            for (int i = 1; i <= 10; i++)
            {
                var user = new User
                {
                    Name = $"User {i}",
                    Username = $"user{i}",
                    Email = $"user{i}@example.com",
                    Password = "password" // Set a default password for all users
                };

                context.Users.Add(user);
            }

            // Check if there are already movies in the database
            if (context.Movies.Any())
            {
                return;
            }

            // Seed 10 movies
            for (int i = 1; i <= 10; i++)
            {
                var movie = new Movie
                {
                    Title = $"Movie {i}",
                    Description = $"Description of movie {i}",
                    Genre = "Action",
                    Duration = 120,
                    Image = "https://via.placeholder.com/150",
                    Video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    Trailer = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                };

                context.Movies.Add(movie);
            }

            context.SaveChanges();
        }
    }
}
