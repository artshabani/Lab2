using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        public readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDbContext _context;
        public RoomController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllRooms()
        {
            var room = await _context.Rooms.ToListAsync();

            return Ok(room);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRoom(Guid id)
        {
            var room = await _context.Rooms.Include(a => a.UserEmails).FirstOrDefaultAsync(b => b.Id == id);

            if (room == null) return BadRequest("Room coudn't be found!");

            return Ok(room);
        }

        [HttpPost]
        public async Task<ActionResult> CreateRoom(Room room)
        {
            var roomExists = await _context.Rooms.FirstOrDefaultAsync(a => a.RoomAdmin == room.RoomAdmin);

            if (roomExists != null) return BadRequest("You already have an active room!");

            var createdRoom = await _context.Rooms.AddAsync(room);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't Create Room!");

            return Ok("Room Created Successfully");
        }
        
        //Not functional yet
        [HttpPut]
        public async Task<ActionResult> AddUsersToRoom(RoomDto room)
        {
            var currentRoom = await _context.Rooms.Include(a => a.UserEmails).FirstOrDefaultAsync(b => b.Id == room.Id);

            // currentRoom.UserEmails = room.UserEmails;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't Add Users to the Room!");

            return Ok("Users added Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoom(Guid id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null) return BadRequest("Room coudn't be found!");

            _context.Rooms.Remove(room);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't Delete Room!");

            return Ok("Room Deleted Successfully");
        }
    }
}