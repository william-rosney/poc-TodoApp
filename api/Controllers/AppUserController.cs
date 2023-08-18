using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppUserController : ControllerBase
    {
        private readonly DataContext _context;

        public AppUserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetUsers(){
            var usersWithTodoList = _context.AppUsers
                .Include(user => user.TodoList)
                .Select(user => new AppUser
                {
                    Id = user.Id,
                    Username = user.Username,
                    TodoList = user.TodoList.Select(task => new TodoTask
                    {
                        Id = task.Id,
                        Title = task.Title,
                        IsCompleted = task.IsCompleted,
                        LastUpdate = task.LastUpdate,
                        LastStatusUpdate = task.LastStatusUpdate
                    }).ToList()
                })
                .ToList();
                return Ok(usersWithTodoList);
        }

        [HttpPost]
        public IActionResult AddUser(AppUserRegisterDTO user){
            var newUser = new AppUser {
                Username = user.Username,
                Password = user.Password,
            };
            _context.AppUsers.Add(newUser);
            _context.SaveChanges();
            return Ok(new { message = "User created" });

        }

        [HttpGet("getTodoListByUserId/{id}")]
        public IActionResult GetTodoListByUserId(int id){
            var user = _context.AppUsers.Include(t => t.TodoList).SingleOrDefault(user => user.Id == id);
            return Ok(user);
        }
    }
}