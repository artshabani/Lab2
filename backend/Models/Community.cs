namespace backend.Models
{
    public class Community
    {
        public Guid Id { get; set; }
        public string Topic { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Username { get; set; }
    }
}