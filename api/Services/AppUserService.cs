using api.Authorization;
using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public interface IAppUserService 
    {
        AuthenticateResponse? Authenticate(AuthenticateRequest model);
        IEnumerable<AppUser> GetUsers();
        AppUser? GetUserById(int id);
        AppUser RegisterUser(AppUserRegisterDTO user);
        void DeleteUser(int id);
        bool UserExist(string username);
    }
    public class AppUserService : IAppUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;  
        private readonly IJwtUtils _jwtUtils;

        public AppUserService(DataContext context, IMapper mapper, IJwtUtils jwtUtils)
        {
            _context = context;
            _mapper = mapper;
            _jwtUtils = jwtUtils;
        }

        public AuthenticateResponse? Authenticate(AuthenticateRequest model)
        {
            var user = GetUsers().SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<AppUser> GetUsers()
        {
            return _context.AppUsers
                .ToList();
        }
        public AppUser? GetUserById(int id)
        {
            return _context.AppUsers.FirstOrDefault(x => x.Id == id);
        }
        public AppUser RegisterUser(AppUserRegisterDTO user)
        {
            AppUser newUser = _mapper.Map<AppUser>(user);
            _context.AppUsers.Add(newUser);
            _context.SaveChanges();

            return newUser;
        }
        public void DeleteUser(int id)
        {
            AppUser userToDelete = _context.AppUsers.SingleOrDefault(user => user.Id == id);
            if(userToDelete != null) {
                _context.AppUsers.Remove(userToDelete);
                _context.SaveChanges();
            }
        }

        public bool UserExist(string username)
        {
            return  _context.AppUsers.Any(x => x.Username.ToLower() == username.ToLower());
        }
    }

}