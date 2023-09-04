using api.Authorization;
using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AppUserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAppUserService _userService;
        private readonly IJwtUtils _jwtUtils;


        public AppUserController(DataContext context, IAppUserService userService, IJwtUtils jwtUtils)
        {
            _context = context;
            _userService = userService;
            _jwtUtils = jwtUtils;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpGet("GetUsers")]
        public IActionResult GetUsers(){

            return Ok(_userService.GetUsers());
        }
        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register(AppUserRegisterDTO registerDTO){
            if(_userService.UserExist(registerDTO.Username)){
                return BadRequest("Username Already exist");
            }
            var user = _userService.RegisterUser(registerDTO);
            return Ok(new AppUser {
                Id = user.Id,
                Username = user.Username,
                Token = _jwtUtils.GenerateJwtToken(user)
            });

        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public IActionResult Login(AuthenticateRequest authRequest){

            var authResponse = _userService.Authenticate(authRequest);

            if (authResponse == null)
                return Unauthorized("Invalid credentials");
            
            return Ok(new AppUserDTO{
                Id = authResponse.Id,
                Username = authResponse.Username,
                Token = authResponse.Token,
            });
        }

        [HttpDelete("DeleteUser/{id}")]
        [AllowAnonymous]
        public IActionResult DeleteUser(int id){
            _userService.DeleteUser(id);
            return Ok(new {
                message = $"User id:{id} deleted",
            });
        }
    }
}