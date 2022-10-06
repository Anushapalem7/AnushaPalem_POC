using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int? BookId { get; set; }
        public string BookTitle { get; set; }
        public int? UserId { get; set; }
        public string PaymentType { get; set; }
        public int? Price { get; set; }
        public DateTime? OrderDate { get; set; }
    }
}
