using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Data;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class MovieService : IMovieService
    {
        private readonly AppDbContext _context;

        public MovieService(AppDbContext context)
        {
            _context = context;
        }
public void LogAction(string username, string action, string entity, DateTime timestamp)
        {
            var log = new Log
            {
                Username = username,
                Entity = entity,
                Action = action,
                Timestamp = DateTime.Now
            };

            _context.Logs.Add(log);
            _context.SaveChanges();
        }

        

  

public async Task<IEnumerable<Movie>> GetAllMovies()
{
    var movies = await _context.Movies.Include(m => m.Genre).ToListAsync();

    return movies;
}

public async Task<Movie> GetMovieById(int id)
{
    var movie = await _context.Movies.Include(m => m.Genre).FirstOrDefaultAsync(m => m.Id == id);

    return movie;
}

public async Task<Movie> CreateMovie(Movie movie)
{
    _context.Movies.Add(movie);
    await _context.SaveChangesAsync();

    // Include genre in the returned movie object
    return await _context.Movies.Include(m => m.Genre).FirstOrDefaultAsync(m => m.Id == movie.Id);
}

public async Task<bool> EditMovie(int id, Movie movie)
{
    if (id != movie.Id)
    {
        return false;
    }

    _context.Entry(movie).State = EntityState.Modified;
    await _context.SaveChangesAsync();

    // Include genre in the updated movie object
    var updatedMovie = await _context.Movies.Include(m => m.Genre).FirstOrDefaultAsync(m => m.Id == id);

    return updatedMovie != null;
}

public async Task<bool> DeleteMovie(int id)
{
    var movie = await _context.Movies.FindAsync(id);

    if (movie == null)
    {
        return false;
    }

    _context.Movies.Remove(movie);
    await _context.SaveChangesAsync();

    return true;
}

    }
}
