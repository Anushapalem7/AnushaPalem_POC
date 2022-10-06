using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POC_API.DbModels
{
    public class bookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int? AuthorId { get; set; }
        public string Publisher { get; set; }
        public string Category { get; set; }
        public string Content { get; set; }
        public string ActiveStatus { get; set; }
        public bool? Blocked { get; set; }
        public int? Price { get; set; }
        public IFormFile ImagePath { get; set; }
        public DateTime? PublishedDate { get; set; }
    }
}
