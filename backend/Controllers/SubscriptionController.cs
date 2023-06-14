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
using backend.Data;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;
        public readonly SignInManager<AppUser> _signInManager;
        public readonly IHttpContextAccessor _accessor;
        public readonly AppDbContext _context;
        public SubscriptionController(IConfiguration configuration, IUserService userService, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IHttpContextAccessor accessor, AppDbContext context)
        {
            _accessor = accessor;
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _userService = userService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Subscribe(SubscribeDto subscribeDto)
        {
            var email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);

            user.Subscribed = subscribeDto.SubId;
            await _context.SaveChangesAsync();
            return Ok(subscribeDto.SubId);
        }

        [HttpGet]
        public async Task<ActionResult<AppUserDto>> GetSubscribe()
        {
            var email = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(email);

            return Ok(user.Subscribed);
        }
    }
}