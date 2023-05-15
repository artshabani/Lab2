using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewHistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly UserManager<AppUser> _userManager;
        public readonly SignInManager<AppUser> _signInManager;

        public ViewHistoryController(AppDbContext context, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        // GET: api/ViewHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViewHistory>>> GetViewHistories()
        {
            // Get the current user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Get all view histories for the current user
            var viewHistories = await _context.ViewHistories
                .Where(vh => vh.AppUserId == userId)
                .ToListAsync();

            if (viewHistories == null)
            {
                return BadRequest();
            }

            return viewHistories;
        }

        [HttpGet("user-id")]
        public async Task<ActionResult<string>> GetCurrentUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return userId;
        }

        // GET: api/ViewHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViewHistory>> GetViewHistory(int id)
        {
            // Get the current user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Get the requested view history
            var viewHistory = await _context.ViewHistories
                .Where(vh => vh.AppUserId == userId && vh.Id == id)
                .FirstOrDefaultAsync();

            if (viewHistory == null)
            {
                return NotFound();
            }

            return viewHistory;
        }

        // POST: api/ViewHistories
        [HttpPost]
        public async Task<ActionResult<ViewHistory>> PostViewHistory(int movieId)
        {
            // Get the current user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Create a new view history object
            var viewHistory = new ViewHistory
            {
                AppUserId = userId,
                MovieId = movieId,
                ViewedOn = DateTime.Now
            };

            // Add the new view history to the database
            _context.ViewHistories.Add(viewHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetViewHistory), new { id = viewHistory.Id }, viewHistory);
        }

        // DELETE: api/ViewHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViewHistory(int id)
        {
            // Get the current user's ID
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Get the requested view history
            var viewHistory = await _context.ViewHistories
                .Where(vh => vh.AppUserId == userId && vh.Id == id)
                .FirstOrDefaultAsync();

            if (viewHistory == null)
            {
                return NotFound();
            }

            // Remove the view history from the database
            _context.ViewHistories.Remove(viewHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
