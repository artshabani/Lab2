using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [EnableCors("CorsPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        // GET: api/movies
        [HttpGet]
        //[Authorize]
        public async Task<IEnumerable<Movie>> GetAllMovies()
        {
            return await _movieService.GetAllMovies();
        }


        // GET: api/movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovieById(int id)
        {
            var movie = await _movieService.GetMovieById(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // POST: api/movies
        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
        {
            _movieService.LogAction("Admin","Created",movie.Title,DateTime.Now);
            var createdMovie = await _movieService.CreateMovie(movie);

            return CreatedAtAction(nameof(GetMovieById), new { id = createdMovie.Id }, createdMovie);
        }

        // PUT: api/movies/5
        [HttpPut]
        public async Task<IActionResult> EditMovie(Movie movie)
        {
            
            _movieService.LogAction("Admin","Updated",movie.Title,DateTime.Now);
            var result = await _movieService.EditMovie(movie.Id, movie);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _movieService.GetMovieById(id);
            _movieService.LogAction("Admin","Deleted",movie.Title,DateTime.Now);
            var result = await _movieService.DeleteMovie(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}