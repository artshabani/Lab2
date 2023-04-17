using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using backend.Models;
using System;
using System.Data;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Data.SqlClient;
using backend.Services.Interfaces;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public LoginController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] User user)
        {
            var allUsers = await _userService.GetAllUsers();

            var count = allUsers
                .Where(u => u.Username == user.Username && u.Password == user.Password)
                .Count();

            if (count > 0)
            {
                user.Id = Convert.ToInt32(Guid.NewGuid().ToString());
                var token = GenerateJwtToken(user);
                return Ok(token);
            }

            return BadRequest("Invalid user");
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]);
            var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Username)
            };

            var credentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
