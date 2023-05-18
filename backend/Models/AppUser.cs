
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class AppUser : IdentityUser
{
    public string? Name { get; set; }
    public List<ViewHistory> ViewHistories { get; set; }
}
