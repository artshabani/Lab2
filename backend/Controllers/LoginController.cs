using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using backend.Data;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LoginController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Login login)
        {
            var result = await _signInManager.PasswordSignInAsync(login.Username, login.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok("Login successful!"); // Return success response if login is valid
            }
            else
            {
                return BadRequest("Invalid username or password"); // Return error response if login is invalid
            }

            // if (IsValidLogin(login))
            // {
            //     return Ok("Login successful!");
            // }
            // else
            // {
            //     return BadRequest("Invalid login credentials.");
            // }
        }

        private bool IsValidLogin(Login login)
        {
            return login.Username == "validUsername" && login.Password == "validPassword";
        }
    }
}
