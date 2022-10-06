using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        DigitalBooksContext db = new DigitalBooksContext();
        [HttpGet]
        public IEnumerable<Order> Get(int id)
        {
            return db.Orders.Where(x=>x.UserId == id).ToList();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        public IActionResult Put([FromBody] Order order)
        {
            db.Orders.Update(order);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var data = db.Orders.Where(x => x.OrderId == id).FirstOrDefault();
            db.Orders.Remove(data);
            db.SaveChanges();
            //
            var response = new { Status = "Success" };
            return Ok(response);
        }
    }
}
