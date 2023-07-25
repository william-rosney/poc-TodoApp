using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class TodoTaskUpdateDTO
    {
        public string Title { get; set; }
        public bool isCompleted { get; set; }
    }
}