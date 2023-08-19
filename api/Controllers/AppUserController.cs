using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Authorization;
using api.DTOs;
using api.Entities;
using api.Helpers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpPost("authenticate")]
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
        public IActionResult AddUser(AppUserRegisterDTO registerDTO){
            if(_userService.UserExist(registerDTO.Username)){
                return BadRequest("Username already taken");
            }
            var user = _userService.RegisterUser(registerDTO);
            return Ok(new AppUser {
                Username = user.Username,
                Token = _jwtUtils.GenerateJwtToken(user)
            });

        }
        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login(AuthenticateRequest authRequest){

            var authResponse = _userService.Authenticate(authRequest);

            if (authResponse == null)
                return Unauthorized("Invalid credentials");
            
            return Ok(new AppUserDTO{
                Username = authResponse.Username,
                Token = authResponse.Token,
            });
        }

        [HttpGet("getTodoListByUserId/{id}")]
        public IActionResult GetTodoListByUserId(int id){
            var user = _context.AppUsers.Include(t => t.TodoList).SingleOrDefault(user => user.Id == id);
            return Ok(user);
        }
    }
}