using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Response
    {
        public string? Status { get; set; }
        public string? Message { get; set; }
    }
}