using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public static class Seed
    {
        public static async Task SeedAdminAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, AppDbContext context)
        {
            if (!roleManager.Roles.Any())
            {

                await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
                await roleManager.CreateAsync(new IdentityRole(Roles.User.ToString()));
                await roleManager.CreateAsync(new IdentityRole(Roles.Suspended.ToString()));

                var defaultUser = new AppUser
                {
                    UserName = "Admin123",
                    Name = "Admin",
                    Email = "admin@gmail.com",
                    Subscribed = 0,
                    EmailConfirmed = true
                };
                if (userManager.Users.All(u => u.Id != defaultUser.Id))
                {
                    var user = await userManager.FindByEmailAsync(defaultUser.Email);
                    if (user == null)
                    {
                        await userManager.CreateAsync(defaultUser, "Idea123.");
                        await userManager.AddToRoleAsync(defaultUser, Roles.User.ToString());
                        await userManager.AddToRoleAsync(defaultUser, Roles.Admin.ToString());
                    }
                }
            }

            if (context.Movies.Any())
            {
                var movies = await context.Movies.ToListAsync();
                context.Movies.RemoveRange(movies);
            }

            List<MovieDto> titles = new List<MovieDto>{
                new MovieDto{ Title = "The Matrix", Image = "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", Trailer = "TheMatrix.mp4"},
                new MovieDto{ Title = "The Godfather", Image = "https://www.pngmart.com/files/22/Godfather-PNG.png", Trailer = "TheGodfather.mp4"},
                new MovieDto{ Title = "Inception", Image = "https://e1.pngegg.com/pngimages/749/892/png-clipart-movie-icon-153-inception-thumbnail.png", Trailer = "Inception.mp4"},
                new MovieDto{ Title = "The Dark Knight", Image = "https://w7.pngwing.com/pngs/306/361/png-transparent-batman-ra-s-al-ghul-batsuit-costume-the-dark-knight-returns-batman.png", Trailer = "TheDarkKnight.mp4"},
                new MovieDto{ Title = "Pulp Fiction", Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMb5jfPQSTyxGmyONp9B2DEflnH2lk2g-B8Q&usqp=CAU", Trailer = "PulpFiction.mp4" },
                new MovieDto{ Title = "Forrest Gump", Image = "https://assets.htv.com.vn/Images/TAP%20CHI%20HTV/HAU%20TRUONG%20TRUYEN%20HINH/DUONG%202020/Forrest%20Gump/Hinh%201%20FG.jpg", Trailer = "ForrestGump.mp4"},
                new MovieDto{ Title = "The Terminator", Image = "https://mastermedia.com/wp-content/uploads/Terminator-pic.png", Trailer = "TheTerminator.mp4" },
                new MovieDto{ Title = "Jurassic Park", Image = "https://www.nicepng.com/png/detail/86-863863_jurassic-park-logo-clipart-png-logo-jurassic-park.png", Trailer = "JurassicPark.mp4"},
                new MovieDto{ Title = "Die Hard", Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi46U4dewmxy8Usapfw_cFS7FgvEr4TIAcVY7WPtNKDHZQb7QpoaZbbOUULOBpPXcXHDs&usqp=CAU", Trailer = "DieHard.mp4" },
                new MovieDto{ Title = "The Lion King", Image = "https://parspng.com/wp-content/uploads/2022/11/lionpng.parspng.com-4.png", Trailer = "TheLionKing.mp4" },
                };

            var random = new Random();

            foreach (var movies in titles)
            {
                var movie = new Movie
                {
                    Title = movies.Title,
                    Description = $"Description of {movies.Title}",
                    GenreId = random.Next(1, 4), // Assign a random genre ID between 1 and 3 (inclusive)
                    Duration = random.Next(60, 240), // Set a random duration between 60 and 240 minutes
                    Image = movies.Image,
                    Video = movies.Trailer,
                    Trailer = movies.Trailer
                };

                context.Movies.Add(movie);
            }
            await context.SaveChangesAsync();
        }
    }
}