using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using api.Services;
using api.DTOs;
using api.Authorization;

namespace api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
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
            TodoTaskDTO newTodo = _todoService.Create(model);
            return Ok(newTodo);
        }

        [HttpPut("UpdateTodo")]
        public IActionResult Upadte(TodoTaskUpdateDTO model)
        {
            TodoTaskDTO updatedTodo = _todoService.Update(model);
            return Ok(updatedTodo);
        }
        [HttpPut("UpdateTodoStatus")]
        public IActionResult UpadteStatus(TodoTaskUpdateDTO model)
        {
            TodoTaskDTO updatedTodo = _todoService.UpdateStatus(model);
            return Ok(updatedTodo);
        }

        [HttpDelete("DeleteTodo")]
        public IActionResult Delete(TodoTaskDeleteDTO model)
        {
            _todoService.Delete(model);
            return Ok(new { message = "TodoTask deleted" });
        }
    }
}