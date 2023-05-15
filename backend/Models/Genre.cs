using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{

    public enum GenreType
    {
        [Display(Name = "Action")]
        Action,
        [Display(Name = "Comedy")]
        Comedy,
        [Display(Name = "Drama")]
        Drama,
        [Display(Name = "Horror")]
        Horror,
        [Display(Name = "Romance")]
        Romance,
        [Display(Name = "Science Fiction")]
        ScienceFiction,
        [Display(Name = "Thriller")]
        Thriller,
    }

    public class Genre
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}