using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using backend;
using backend.DTO;
using backend.Models;
using backend.Data;

namespace backend.SignalR
{
    public class CommunityHub : Hub
    {
        private readonly AppDbContext _context;

        public CommunityHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendComment(CommentDto commentDto)
        {
            var topic = await _context.Community.Include(a => a.Comments).FirstOrDefaultAsync(a => a.Id == Guid.Parse(commentDto.TopicId));

            var comment = new Comment
            {
                Body = commentDto.Body,
                Username = commentDto.Username
            };

            topic.Comments.Add(comment);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
            {
                await Clients.Group(commentDto.TopicId).SendAsync("ReceiveComment", comment);
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var topicId = httpContext!.Request.Query["topicId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, topicId);

            var result = await _context.Community
            .Include(a => a.Comments)
            .Where(a => a.Id == Guid.Parse(topicId))
            .FirstOrDefaultAsync();

            await Clients.Caller.SendAsync("LoadComments", result);
        }
    }
}