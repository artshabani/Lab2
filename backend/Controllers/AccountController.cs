using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services.Interfaces;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using backend.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;
        public readonly SignInManager<AppUser> _signInManager;
        public readonly IHttpContextAccessor _accessor;
        public AccountController(IConfiguration configuration, IUserService userService, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IHttpContextAccessor accessor)
        {
            _accessor = accessor;
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _userService = userService;
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<AppUserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDtos = users.Select(user => createUserObject(user)).ToList();

            return Ok(userDtos);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(string id, EditUserDto editUserDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = editUserDto.Name;
            user.UserName = editUserDto.Username;
            user.Email = editUserDto.Email;

            var result = await _userManager.UpdateAsync(user);
            _userService.LogAction(this,"Updated",user.Name,DateTime.Now);

            if (result.Succeeded)
            {
                return Ok(createUserObject(user));
                
            }
            else
            {
                return BadRequest(result.Errors);
            }
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUserDto>> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return createUserObject(user);
        }



        [HttpGet]
        [Authorize]
        public async Task<ActionResult<AppUserDto>> GetUser()
        {
            var email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return createUserObject(user);
            }
            else
            {
                return Unauthorized("Unauthorized no user found");
            }
        }
        

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> CreateUser(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                Name = registerDto.Name,
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            _userService.LogAction(this,"Created",user.Name,DateTime.Now);

            if (result.Succeeded)
            {
                return createUserObject(user);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            _userService.LogAction(this,"Deleted",user.Name,DateTime.Now);

            if (result.Succeeded)
            {
                return NoContent();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(a => a.Email == loginDto.Email);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return createUserObject(user);
            }
            else
            {
                return BadRequest();
            }
        }

        private string GenerateJwtToken(AppUser user)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.Email,user.Email),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private AppUserDto createUserObject(AppUser user)
        {
            return new AppUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.UserName,
                Email = user.Email,
                Token = GenerateJwtToken(user)
            };
        }
    }
}