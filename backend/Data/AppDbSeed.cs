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
        
        context.SaveChanges();
    }
}

}