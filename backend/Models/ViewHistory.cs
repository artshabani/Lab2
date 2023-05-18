using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ViewHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime ViewedOn { get; set; }

        [Required]
        public int MovieId { get; set; }

        [Required]
        public string AppUserId { get; set; }

        [ForeignKey("AppUserId")]
        public AppUser AppUser { get; set; }
    }
}