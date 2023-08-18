using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.DTOs
{
    public class TodoTaskCreateDTO
    {
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public int UserId { get; set; }

    }
}