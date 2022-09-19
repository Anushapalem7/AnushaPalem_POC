using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        DigitalBooksContext db = new DigitalBooksContext();
        private IConfiguration _config;

        public UserController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users;
        }
[HttpPost]
        [Route("login-user")]
        public IActionResult Login(User u)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(u,false);
            if (user != null)
            {
                var tokenString = GenerateToken(user);
                response = Ok(new { token = tokenString });
            }
            return response;
        }

        private User AuthenticateUser(User u,bool IsRegister)
        {
            if (IsRegister)
            {
                db.Users.Add(u);
                return u;
            }
            else
            {
                if (db.Users.Any(x => x.UserName == u.UserName && x.Password == u.Password))
                {
                    return db.Users.Where(x => x.UserName == u.UserName && x.Password == u.Password).FirstOrDefault();
                }
                else
                {
                    return null;
                }
            }
       
        }

        private string GenerateToken(User u)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["jwt:Issuer"],
                _config["jwt:Audience"],
                null,
                expires:DateTime.Now.AddMinutes(120),
                signingCredentials:credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            db.Users.Add(user);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}
