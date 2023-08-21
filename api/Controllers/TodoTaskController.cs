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
        [HttpGet("GetUserTodoList/{userId}")]
        public IActionResult GetAll(int userId)
        {
            var todos = _todoService.GetAll(userId);
            return Ok(todos);
        }

        [HttpPost("CreateTodo")]
        public IActionResult Create(TodoTaskCreateDTO model)
        {
            _todoService.Create(model);
            return Ok(new { message = "TodoTask created" });
        }

        [HttpPut("UpdateTodo")]
        public IActionResult Upadte(TodoTaskUpdateDTO model)
        {
            _todoService.Update(model);
            return Ok(new { message = $"TodoTask Updated"});
        }
        [HttpPut("UpdateTodoStatus")]
        public IActionResult UpadteStatus(TodoTaskUpdateDTO model)
        {
            _todoService.UpdateStatus(model);
            return Ok(new { message = $"TodoTask Status Updated"});
        }

        [HttpDelete("DeleteTodo")]
        public IActionResult Delete(TodoTaskDeleteDTO model)
        {
            _todoService.Delete(model);
            return Ok(new { message = "TodoTask deleted" });
        }
    }
}