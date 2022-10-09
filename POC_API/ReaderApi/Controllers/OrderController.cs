using MassTransit;
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
        private readonly IBus bus;
        public OrderController(IBus _bus)
        {
            bus = _bus;
        }
        DigitalBooksContext db = new DigitalBooksContext();
        [HttpGet]
        public IEnumerable<Order> Get(int id)
        {
            return db.Orders.Where(x=>x.UserId == id).ToList();
        }
   

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Order order)
        {
            db.Orders.Add(order);
            db.SaveChanges();
            Uri uri = new Uri("rabbitmq:localhost/BlockQueue");
            var endpoint = await bus.GetSendEndpoint(uri);
            Order orderMessage = new Order();
            orderMessage.BookId = order.BookId;
            orderMessage.BookTitle = order.BookTitle;
            orderMessage.OrderId = order.OrderId;
            orderMessage.OrderDate = order.OrderDate;
            orderMessage.PaymentType = order.PaymentType;
            await endpoint.Send(orderMessage);
            return Ok(new { status = "Your order is placed" });
            
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
