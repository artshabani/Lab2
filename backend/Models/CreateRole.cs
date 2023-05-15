using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class CreateRole
    {
        [Required]
        public string RoleName { get; set; }
    }
}
