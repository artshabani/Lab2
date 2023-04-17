using System;
using System.Linq;
using System.Collections.Generic;
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
            var names = new List<string> { "John", "Mary", "Jane", "Michael", "David", "Sarah", "Emily", "Jessica", "Kevin", "Brian" };
            var usernames = new List<string> { "john123", "mary456", "jane789", "michael101", "david202", "sarah303", "emily404", "jessica505", "kevin606", "brian707" };

            for (int i = 0; i < names.Count; i++)
            {
                var user = new User
                {
                    Name = names[i],
                    Username = usernames[i],
                    Email = $"{usernames[i]}@example.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("password") // Set a default password for all users
                };

                context.Users.Add(user);
            }

            // Check if there are already movies in the database
            if (context.Movies.Any())
            {
                return;
            }

            // Seed 10 movies
            var genres = new List<string> { "Action", "Comedy", "Drama", "Horror", "Sci-Fi" };
            var titles = new List<string> { "The Matrix", "Star Wars", "The Lord of the Rings", "The Shawshank Redemption", "The Godfather", "Inception", "The Dark Knight", "Pulp Fiction", "Fight Club", "Forrest Gump", "The Terminator", "Aliens", "The Silence of the Lambs", "Jurassic Park", "Indiana Jones", "Ghostbusters", "Back to the Future", "Die Hard", "The Lion King", "Beauty and the Beast" };

            for (int i = 0; i < titles.Count; i++)
            {
                var movie = new Movie
                {
                    Title = titles[i],
                    Description = $"Description of {titles[i]}",
                    Genre = genres[new Random().Next(genres.Count)], // Select a random genre from the list
                    Duration = new Random().Next(90, 180), // Set a random duration between 90 and 180 minutes
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
