﻿using System;
using System.Collections.Generic;

#nullable disable

namespace POC_API.DbModels
{
    public partial class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
