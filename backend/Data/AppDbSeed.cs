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

            // Seed 20 users
            var names = new List<string> { "John", "Mary", "Jane", "Michael", "David", "Sarah", "Emily", "Jessica", "Kevin", "Brian", "Olivia", "Ethan", "Sophia", "Noah", "Isabella", "Liam", "Ava", "Mia", "Logan", "Charlotte" };
            var usernames = new List<string> { "john123", "mary456", "jane789", "michael101", "david202", "sarah303", "emily404", "jessica505", "kevin606", "brian707", "olivia808", "ethan909", "sophia1010", "noah1111", "isabella1212", "liam1313", "ava1414", "mia1515", "logan1616", "charlotte1717" };

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

            // Seed 40 movies
            var genres = new List<string> { "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Adventure", "Documentary" };
            var titles = new List<string> { "The Matrix", "Star Wars", "The Lord of the Rings", "The Shawshank Redemption", "The Godfather", "Inception", "The Dark Knight", "Pulp Fiction", "Fight Club", "Forrest Gump", "The Terminator", "Aliens", "The Silence of the Lambs", "Jurassic Park", "Indiana Jones", "Ghostbusters", "Back to the Future", "Die Hard", "The Lion King", "Beauty and the Beast", "The Notebook", "Titanic", "Pretty Woman", "The Fault in Our Stars", "The Hunger Games", "The Bourne Identity", "Ocean's Eleven", "Gladiator", "A Beautiful Mind", "Moulin Rouge!", "The Grand Budapest Hotel", "The Social Network", "La La Land", "Moonlight", "The Shape of Water", "Get Out", "Black Panther", "Avengers: Endgame", "The Irishman" };

            for (int i = 0; i < titles.Count; i++)
            {
                var movie = new Movie
                {
                    Title = titles[i],
                    Description = $"Description of {titles[i]}",
                    Genre = genres[new Random().Next(genres.Count)], // Select a random genre from the list
                    Duration = new Random().Next(60, 240), // Set a random duration between 60 and 240 minutes
                    Image = $"https://via.placeholder.com/150",
                    Video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    Trailer = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                };

                context.Movies.Add(movie);
            }

            context.SaveChanges();
        }
    }
}
