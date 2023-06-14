using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : Controller
    {
        private readonly AppDbContext _context;

        public StatisticsController(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return Json(new
            {
                data = await Area()
            });
        }

        [HttpGet("area")]
        public async Task<IEnumerable<int>> Area()
        {
            var viewCounts = new int[12];

            for (var i = 1; i <= 12; i++)
            {
                viewCounts[i - 1] = await _context.Movies.Where(p => p.ViewCount == i).CountAsync();
            }

            return viewCounts;
        }

        [HttpGet("pie")]
        public async Task<IEnumerable<Movie>> Pie()
        {
            var mov =
                await _context.Movies.OrderByDescending(m => m.Duration).Take(3).ToArrayAsync();

            return new[]
                {
                    mov[0],
                    mov[1],
                    mov[2]
                };
        }

        // [HttpGet("donut")]
        // public async Task<IEnumerable<int>> Donut()
        // {
        //     var viewCounts = new int[12];

        //     foreach (Genre genre in Enum.GetValues(typeof(Genre)))
        //     {
        //         var moviesByGenre = await _context.Movies.Where(p => p.Genre == genre).ToListAsync();
        //         for (var i = 1; i <= 12; i++)
        //         {
        //             viewCounts[i - 1] += moviesByGenre.Where(p => p.ViewCount == i).Count();
        //         }
        //     }
        //     return viewCounts;
        // }
    }
}