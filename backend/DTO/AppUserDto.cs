
namespace backend.DTO
{
    public class AppUserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public IEnumerable<string> UserRoles { get; set; }
    }
}