using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [ForeignKey("GenreId")]
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

        public int Duration { get; set; }

        public string Image { get; set; }

        public string Video { get; set; }

        public string Trailer { get; set; }

        public int ViewCount { get; set; }
    }
}
