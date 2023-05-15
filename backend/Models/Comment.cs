namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string Username { get; set; }
        public int UserAvatar { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}