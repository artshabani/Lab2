using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class StatisticsController : Controller
    {
        private readonly AppDbContext _context;

        public StatisticsController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return Json(new
            {
                data = Area()
            });
        }

        [HttpGet]
        public ActionResult<IEnumerable<int>> Area()
        {
            var viewCounts = new int[12];

            for (var i = 1; i <= 12; i++)
            {
                viewCounts[i - 1] = _context.Movies.Where(p => p.ViewCount == i).Count();
            }

            return viewCounts;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Movie>> Pie()
        {
            var mov =
                _context.Movies.OrderByDescending(m => m.Duration).Take(3).ToArray();

            return new[]
                {
                    mov[0],
                    mov[1],
                    mov[2]
                };
        }
    }
}