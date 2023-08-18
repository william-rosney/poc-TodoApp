using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
    [Table("TodoTasks")]
    public class TodoTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime LastUpdate { get; set; } = DateTime.Now;
        public DateTime LastStatusUpdate { get; set; }
        public AppUser User { get; set; }
        public int UserId { get; set; }
    }
}