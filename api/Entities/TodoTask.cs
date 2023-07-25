using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    public class TodoTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public bool isCompleted { get; set; }
    }
}