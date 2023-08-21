using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class TodoTaskDeleteDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
    }
}