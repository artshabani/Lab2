using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class RoomDto
    {
        public Guid Id { get; set; }
        [Required]
        public List<string> UserEmails { get; set; }
    }
}