using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IMovieService
    {
        void LogAction(string username, string action, string entity, DateTime timestamp);
        Task<IEnumerable<Movie>> GetAllMovies();
        Task<Movie> GetMovieById(int id);
        Task<Movie> CreateMovie(Movie movie);
        Task<bool> EditMovie(int id, Movie movie);
        Task<bool> DeleteMovie(int id);
    }
}