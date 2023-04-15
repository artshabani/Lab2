using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Email { get; set; }

    private string _passwordHash;

    [Required]
    public string Password
    {
        get { return _passwordHash; }
        set { _passwordHash = BCrypt.Net.BCrypt.HashPassword(value); }
    }

   


}

}