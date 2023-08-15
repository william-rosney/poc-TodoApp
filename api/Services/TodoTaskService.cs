using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Helpers;
using AutoMapper;

namespace api.Services
{
    public interface ITodoTaskService
    {
        IEnumerable<TodoTaskDTO> GetAll();
        TodoTaskDTO GetById(int id);
        void Create(TodoTaskCreateDTO model);
        void Update(int id, TodoTaskUpdateDTO model);
        void UpdateStatus(int id, TodoTaskUpdateDTO model);
        void Delete(int id);

    }
    public class TodoTaskService : ITodoTaskService
    {
        private DataContext _context;
        private readonly IMapper _mapper;

        public TodoTaskService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<TodoTaskDTO> GetAll()
        {
            var todos = _context.Todos;
            return _mapper.Map<IEnumerable<TodoTaskDTO>>(todos);
        }

        public TodoTaskDTO GetById(int id)
        {
            var todo = GetTodoTaskById(id);
            return _mapper.Map<TodoTaskDTO>(todo);
        }

        public void Create(TodoTaskCreateDTO model)
        {
            TodoTask newTodo = _mapper.Map<TodoTask>(model);
            _context.Todos.Add(newTodo);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            TodoTask todo = GetTodoTaskById(id);
            _context.Todos.Remove(todo);
            _context.SaveChanges();
        }
        public void Update(int id, TodoTaskUpdateDTO model)
        {
            TodoTask todo = GetTodoTaskById(id);
            todo = _mapper.Map(model, todo);
            todo.LastUpdate = DateTime.Now;
            _context.Todos.Update(todo);
            _context.SaveChanges();
        }
        public void UpdateStatus(int id, TodoTaskUpdateDTO model)
        {
            TodoTask todo = GetTodoTaskById(id);
            todo = _mapper.Map(model, todo);
            todo.LastUpdate = DateTime.Now;
            todo.LastStatusUpdate = DateTime.Now;
            _context.Todos.Update(todo);
            _context.SaveChanges();
        }

        // helper methods
        private TodoTask GetTodoTaskById(int id)
        {
            var todo = _context.Todos.Find(id) ?? throw new KeyNotFoundException("TodoTask not found");
            return todo;
        }
    }
}