using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MovieDto
    { 
        public string Title { get; set; }
        public string Image { get; set; }
        public string Trailer { get; set; }
    }
}