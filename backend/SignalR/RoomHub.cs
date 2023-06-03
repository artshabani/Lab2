using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using backend;
using backend.DTO;
using backend.Models;
using backend.Data;

namespace backend.SignalR
{
    public class RoomHub : Hub
    {
        private readonly AppDbContext _context;

        public RoomHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendComment(CommentDto commentDto)
        {
            var room = await _context.Rooms.Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == Guid.Parse(commentDto.RoomId));

            var comment = new Comment
            {
                Body = commentDto.Body,
                Username = commentDto.Username,
            };

            room.Comments.Add(comment);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                await Clients.Group(commentDto.RoomId).SendAsync("ReceiveComment", comment);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var roomId = httpContext!.Request.Query["roomId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            var result = await _context.Rooms
            .Include(a => a.Comments)
            .Include(a => a.UserEmails)
            .Where(a => a.Id == Guid.Parse(roomId))
            .FirstOrDefaultAsync();

            await Clients.Caller.SendAsync("LoadComments", result);
        }
    }
}