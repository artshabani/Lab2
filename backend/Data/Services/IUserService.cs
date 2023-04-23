using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        void LogAction(ControllerBase controller, string action, string entity, DateTime timestamp);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task<User> CreateUser(User user);
        Task<bool> EditUser(int id, User user);
        Task<bool> DeleteUser(int id);
    }
}
