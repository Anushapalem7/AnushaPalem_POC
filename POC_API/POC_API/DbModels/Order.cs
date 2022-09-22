using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int? BookId { get; set; }
        public int? UserId { get; set; }
        public int? Quantity { get; set; }
        public int? Price { get; set; }
    }
}
