using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class TodoTaskUpdateDTO : TodoTaskCreateDTO
    {
        public int Id { get; set; }
    }
}