using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommunityController : ControllerBase
    {
        public readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _context;
        public CommunityController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllCommunity()
        {
            var room = await _context.Community.ToListAsync();

            return Ok(room);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCommunity(TopicDto community)
        {
            var newCommunity = new Community
            {
                Topic = community.Topic,
                Username = community.Username
            };

            await _context.Community.AddAsync(newCommunity);

            await _context.SaveChangesAsync();

            return Ok("created");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCommunity(Guid id)
        {
            var room = await _context.Community.Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == id);

            if (room == null) return BadRequest("Room coudn't be found!");

            _context.RemoveRange(room.Comments);

            _context.Community.Remove(room);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't Delete!");

            return Ok("Deleted Successfully");
        }
    }
}