using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using api.Services;
using api.DTOs;

namespace api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class TodoTaskController : ControllerBase
    {
        private readonly ITodoTaskService _todoService;
        private readonly IMapper _mapper;
        public TodoTaskController(ITodoTaskService todoService, IMapper mapper)
        {
            _todoService = todoService;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var todos = _todoService.GetAll();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var todo = _todoService.GetById(id);
            return Ok(todo);
        }

        [HttpPost]
        public IActionResult Create(TodoTaskCreateDTO model)
        {
            _todoService.Create(model);
            return Ok(new { message = "TodoTask created" });
        }

        [HttpPut("{id}")]
        public IActionResult Upadte(int id, TodoTaskUpdateDTO model)
        {
            _todoService.Update(id, model);
            return Ok(new { message = $"TodoTask Updated"});
        }
        [HttpPut("updateStatus/{id}")]
        public IActionResult UpadteStatus(int id, TodoTaskUpdateDTO model)
        {
            _todoService.UpdateStatus(id, model);
            return Ok(new { message = $"TodoTask Status Updated"});
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _todoService.Delete(id);
            return Ok(new { message = "TodoTask deleted" });
        }
    }
}