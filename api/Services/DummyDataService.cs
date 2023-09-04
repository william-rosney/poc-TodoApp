using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Helpers;

namespace api.Services
{
    public class DummyDataService
    {
        private DataContext _context;
        public DummyDataService(DataContext context)
        {
            _context = context;
        }

        public void InsertData()
    {
        // Create a new user
        var newUser = new AppUser
        {
            Username = "newuser",
            Password = "password"
        };

        // Create a new task associated with the user
        var newTask = new TodoTask
        {
            Title = "Complete Task",
            IsCompleted = false,
            LastStatusUpdate = DateTime.Now,
            UserId = newUser.Id, // Assign the user's Id
            User = newUser // Set the navigation property
        };

        // Add the user and task to the context and save changes
        _context.AppUsers.Add(newUser);
        _context.Todos.Add(newTask);
        _context.SaveChanges();
    }
    }
}