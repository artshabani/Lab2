using System;
using System.Collections.Generic;
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

        // Check if there are already genres in the database
        if (context.Genres.Any())
        {
            return;
        }

        // Seed 3 genres
        var genres = new List<string> { "Action", "Comedy", "Drama" };

        foreach (var genreName in genres)
        {
            var genre = new Genre
            {
                Name = genreName
            };

            context.Genres.Add(genre);
        }

        // Check if there are already movies in the database
        if (context.Movies.Any())
        {
            return;
        }

        // Seed 10 movies
        var titles = new List<string> { "The Matrix", "The Godfather", "Inception", "The Dark Knight", "Pulp Fiction", "Forrest Gump", "The Terminator", "Jurassic Park", "Die Hard", "The Lion King" };

        var random = new Random();

        foreach (var title in titles)
        {
            var movie = new Movie
            {
                Title = title,
                Description = $"Description of {title}",
                GenreId = random.Next(1, 4), // Assign a random genre ID between 1 and 3 (inclusive)
                Duration = random.Next(60, 240), // Set a random duration between 60 and 240 minutes
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