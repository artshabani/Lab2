using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<AppUser> userManager;
        public AdminController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        [HttpGet]
        public IActionResult CreateRole()
        {
            //return View();
            return Json(new { message = "This method is not used anymore" });
        }

        [HttpPost("createrole")]
        public async Task<IActionResult> CreateRole(CreateRole role)
        {
            if (ModelState.IsValid)
            {
                IdentityRole identityRole = new IdentityRole
                {
                    Name = role.RoleName
                };
                IdentityResult result = await roleManager.CreateAsync(identityRole);

                if (result.Succeeded)
                {
                    return Json(new { success = true, message = "Role created successfully" });
                    //return RedirectToAction("Roles", "Admin");
                }
                foreach (IdentityError e in result.Errors)
                {
                    ModelState.AddModelError("", e.Description);
                }
            }
            return Json(new { success = false, message = "Error creating role" });
            //return View(role);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> Roles()
        {
            var roles = await roleManager.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var role = await roleManager.FindByIdAsync(id);

            if (role == null)
            {
                return NotFound();
            }
            else
            {
                var result = await roleManager.DeleteAsync(role);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Role deleted successfully." });
                    //return RedirectToAction("Roles");
                }
                return BadRequest(new { message = "Role deletion failed." });

                // foreach (var error in result.Errors)
                // {
                //     ModelState.AddModelError("", error.Description);
                // }

                // return RedirectToAction("Roles");
            }
        }
    }
}
