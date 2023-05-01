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
        private readonly UserManager<ApplicationUser> userManager;
        public AdminController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
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
        public IActionResult Roles()
        {
            var roles = roleManager.Roles;
            return (IActionResult)roles;
            //return Json(new { success = true, roles = roles });
            //return View(roles);
        }

        [HttpGet("editusersinrole/{roleId}")]
        public async Task<IActionResult> EditUsersInRole(string roleId)
        {
            ViewBag.roleId = roleId;

            var role = await roleManager.FindByIdAsync(roleId);

            if (role == null)
            {
                return NotFound();
            }
            var model = new List<UserRole>();
            foreach (var user in await userManager.Users.ToListAsync())
            {
                var userRole = new UserRole
                {
                    UserId = user.Id,
                    UserName = user.UserName
                };

                if (await userManager.IsInRoleAsync(user, role.Name))
                {
                    userRole.isSelected = true;
                }
                else
                {
                    userRole.isSelected = false;
                }
                model.Add(userRole);

            }

            return Ok(model);
        }

        [HttpPost("editusersinrole/{roleId}")]
        public async Task<IActionResult> EditUsersInRole(List<UserRole> model, string roleId)
        {
            var role = await roleManager.FindByIdAsync(roleId);

            if (role == null)
            {
                return NotFound();
            }


            for (int i = 0; i < model.Count; i++)
            {
                var user = await userManager.FindByIdAsync(model[i].UserId);

                IdentityResult result = null;

                if (model[i].isSelected && !(await userManager.IsInRoleAsync(user, role.Name)))
                {
                    result = await userManager.AddToRoleAsync(user, role.Name);
                }
                else if (!model[i].isSelected && await userManager.IsInRoleAsync(user, role.Name))
                {
                    result = await userManager.RemoveFromRoleAsync(user, role.Name);
                }
                else
                {
                    continue;
                }
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                // if (result.Succeeded)
                // {
                //     if (i < (model.Count - 1))
                //         continue;
                //     else
                //         return RedirectToAction("Roles");
                // }
            }
            return Ok();
            //return RedirectToAction("Roles");

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
