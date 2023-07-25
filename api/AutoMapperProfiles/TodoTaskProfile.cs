using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using api.Entities;
using api.DTOs;

namespace api.AutoMapperProfiles
{
    public class TodoTaskProfile : Profile
    {
        public TodoTaskProfile()
        {
            CreateMap<TodoTask, TodoTaskDTO>();
            CreateMap<TodoTaskDTO, TodoTask>();
            CreateMap<TodoTaskUpdateDTO, TodoTask>();
            CreateMap<TodoTaskCreateDTO, TodoTask>();

        }
    }
}