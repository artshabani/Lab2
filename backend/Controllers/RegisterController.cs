using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        [HttpGet]
        //tash kjo me View() nuk bon spo ma kap qysh mi testu me routes
        public IActionResult Index()
        {
            return View();
        }
    }
}