using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class RoomDto
    {   
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Public { get; set; }
        public string RoomAdmin { get; set; }
        public string AdminUsername { get; set; }
        public int MovieId { get; set; }
        public List<string> UserEmails { get; set; }
    }
}