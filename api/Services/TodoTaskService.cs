using api.DTOs;
using api.Entities;
using api.Helpers;
using AutoMapper;

namespace api.Services
{
    public interface ITodoTaskService
    {
        IEnumerable<TodoTaskDTO> GetAll(int userId);
        TodoTaskDTO Create(TodoTaskCreateDTO model);
        TodoTaskDTO Update(TodoTaskUpdateDTO model);
        TodoTaskDTO UpdateStatus(TodoTaskUpdateDTO model);
        void Delete(TodoTaskDeleteDTO model);

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

        public IEnumerable<TodoTaskDTO> GetAll(int userId)
        {
            var todos = _context.Todos.Where(todo => todo.UserId == userId);
            return _mapper.Map<IEnumerable<TodoTaskDTO>>(todos);
        }

        public TodoTaskDTO Create(TodoTaskCreateDTO model)
        {
            TodoTask newTodo = _mapper.Map<TodoTask>(model);
            newTodo.LastStatusUpdate = newTodo.LastUpdate;
            _context.Todos.Add(newTodo);
            _context.SaveChanges();
            return _mapper.Map<TodoTaskDTO>(newTodo);
        }

        public void Delete(TodoTaskDeleteDTO model)
        {
            var userTodos = GetTodoTasksByUserId(model.UserId);
            TodoTask todo = GetTodoTaskById(userTodos, model.Id);
            _context.Todos.Remove(todo);
            _context.SaveChanges();
        }
        public TodoTaskDTO Update(TodoTaskUpdateDTO model)
        {
            var userTodos = GetTodoTasksByUserId(model.UserId);
            TodoTask todo = GetTodoTaskById(userTodos, model.Id);
            todo = _mapper.Map(model, todo);
            todo.LastUpdate = DateTime.Now;

            _context.Todos.Update(todo);
            _context.SaveChanges();

            return _mapper.Map<TodoTaskDTO>(todo);
        }
        public TodoTaskDTO UpdateStatus(TodoTaskUpdateDTO model)
        {
            var userTodos = GetTodoTasksByUserId(model.UserId);
            TodoTask todo = GetTodoTaskById(userTodos, model.Id);
            todo = _mapper.Map(model, todo);
            todo.LastUpdate = DateTime.Now;
            todo.LastStatusUpdate = DateTime.Now;

            _context.Todos.Update(todo);
            _context.SaveChanges();
            
            return _mapper.Map<TodoTaskDTO>(todo);
        }

        // helper methods

        private IEnumerable<TodoTask> GetTodoTasksByUserId(int userId)
        {
            var todos = _context.Todos.Where(todo => todo.UserId == userId);
            return todos;
        }

        private TodoTask GetTodoTaskById(IEnumerable<TodoTask> userTodos, int todoId)
        {
            var todo = userTodos.SingleOrDefault(todo => todo.Id == todoId) ?? throw new ArgumentNullException("TodoTask not found");
            return todo;
        }
    }
}