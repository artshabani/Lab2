using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int StartMode { get; set; }
        [Required]
        public bool Public { get; set; }
        [Required]
        public string RoomAdmin { get; set; }
        [Required]
        public int AdminAvatar { get; set; }
        [Required]
        public string AdminUsername { get; set; }
        [Required]
        public int MovieId { get; set; }
        [Required]
        public string MoviePoster { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<UserEmails> UserEmails { get; set; }
    }
}