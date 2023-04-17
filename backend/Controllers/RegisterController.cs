using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.Data.SqlClient;
using System.Data;
using System.Security.Claims;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        public RegisterController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var createdUser = await _userService.CreateUser(user);

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Login([FromBody] User user)
        {
            //if (user.Username.Equals("") && user.Password.Equals(""))
            //{
                user.Id = Convert.ToInt32(Guid.NewGuid().ToString());
                //user.Id = Guid.NewGuid().ToString();
                var token = GenerateJwtToken(user);
                return Ok(token);
            //}

            //return BadRequest("Invalid user");
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

        /*
        [HttpPost]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index");
        }*/

        // [HttpGet]
        // public IActionResult Get()
        // {
        //     return Ok("Hello from RegisterController!");
        // }

        // [HttpPost]
        // public IActionResult Post([FromBody] Register register)
        // {
        //     return Ok("Registration successful!");
        // }
    }
}