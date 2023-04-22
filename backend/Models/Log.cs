using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks; 

namespace backend.Models
{
    public class Log{

        public int Id { get; set; }
        public string Username { get; set; }
        public string Entity { get; set; } 
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }

    }

}