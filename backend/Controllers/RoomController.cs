using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly AppDbContext _context;
        public readonly IHttpContextAccessor _accessor;

        public RoomController(AppDbContext context, IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
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
                Status = true,
                MovieId = room.MovieId,
                Comments = new List<Comment>(),
                UserEmails = new List<UserEmails>()
            };

            if (!room.Public)
            {
                var email2 = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);

                newRoom.UserEmails.Add(new UserEmails{UserEmail = email2});
                
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

        [HttpPut("{id}")]
        public async Task<ActionResult> EndRoom(Guid id)
        {
            var room = await _context.Rooms.Include(a => a.Comments).Include(a => a.UserEmails).FirstOrDefaultAsync(a => a.Id == id);
            room.Status = false;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't end Room!");

            return Ok(room);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRoom(Guid id)
        {
            var room = await _context.Rooms.Include(a => a.UserEmails).Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == id);

            if (room == null) return BadRequest("Room coudn't be found!");

            _context.RemoveRange(room.UserEmails);

            _context.RemoveRange(room.Comments);

            _context.Rooms.Remove(room);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Coudn't Delete Room!");

            return Ok("Room Deleted Successfully");
        }
    }
}