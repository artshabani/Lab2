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
        public async Task<ActionResult> CreateRoom(RoomDto room)
        {
            // var roomExists = await _context.Rooms.FirstOrDefaultAsync(a => a.RoomAdmin == room.RoomAdmin);

            // if (roomExists != null) return BadRequest("You already have an active room!");

            var newRoom = new Room
            {
                Id = room.Id,
                Name = room.Name,
                Public = room.Public,
                RoomAdmin = room.RoomAdmin,
                AdminUsername = room.AdminUsername,
                MovieId = room.MovieId,
                Comments = new List<Comment>(),
                UserEmails = new List<UserEmails>()
            };

            if (!room.Public)
            {
                foreach (var email in room.UserEmails)
                {
                    var newEmail = new UserEmails
                    {
                        UserEmail = email
                    };

                    newRoom.UserEmails.Add(newEmail);
                };
            }
            await _context.Rooms.AddAsync(newRoom);

            await _context.SaveChangesAsync();

            return Ok("createdRoom");
        }

        //Not functional yet
        [HttpPut]
        public async Task<ActionResult> AddUsersToRoom(RoomDto room)
        {
            // var currentRoom = await _context.Rooms.Include(a => a.UserEmails).FirstOrDefaultAsync(b => b.Id == room.Id);

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