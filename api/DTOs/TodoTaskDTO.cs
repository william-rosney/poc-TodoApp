using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
    public class TodoTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool isCompleted { get; set; }
        public DateTime LastUpdate { get; set; }

    }
}