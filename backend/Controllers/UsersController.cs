using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        // GET: api/users/5
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

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _userService.LogAction(this,"Created",user.Name,DateTime.Now);
            var createdUser = await _userService.CreateUser(user);

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }

        // PUT: api/users/5
        [HttpPut]
        public async Task<IActionResult> EditUser(User user)
        {
            _userService.LogAction(this,"Updated",user.Name,DateTime.Now);
            var success = await _userService.EditUser(user.Id, user);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userService.GetUserById(id);
            _userService.LogAction(this,"Deleted",user.Name,DateTime.Now);
            var success = await _userService.DeleteUser(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}