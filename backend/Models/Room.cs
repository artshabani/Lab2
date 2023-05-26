using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Public { get; set; }
        public string RoomAdmin { get; set; }
        public string AdminUsername { get; set; }
        public int MovieId { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<UserEmails> UserEmails { get; set; }
    }
}