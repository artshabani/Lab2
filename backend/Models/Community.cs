namespace backend.Models
{
    public class Community
    {
        public int Id { get; set; }
        public string Forum { get; set; }
        public string Topic { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}