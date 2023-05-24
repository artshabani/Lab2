using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Data;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

         public void LogAction(ControllerBase controller, string action, string entity, DateTime timestamp)
        {
             if (controller.User.Identity.IsAuthenticated)
                {
            var log = new Log
            {
                Username = controller.User.Identity.Name,
                Entity = entity,
                Action = action,
                Timestamp = DateTime.Now
            };

            _context.Logs.Add(log);
            _context.SaveChanges();
                }
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> EditUser(int id, User user)
        {
            if (id != user.Id)
            {
                return false;
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
