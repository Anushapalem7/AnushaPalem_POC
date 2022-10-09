using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class PurchaseCount
    {
        public int Id { get; set; }
        public int? Bookid { get; set; }
        public int? PurchaseCount1 { get; set; }
    }
}
