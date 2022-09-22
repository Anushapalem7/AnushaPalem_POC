using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class Book
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
        public DateTime? PublishedDate { get; set; }
    }
}
