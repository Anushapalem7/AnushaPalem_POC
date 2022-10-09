using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class OrderCount
    {
        public int OrderCount1 { get; set; }
        public int? BookId { get; set; }
        public int? Count { get; set; }
    }
}
