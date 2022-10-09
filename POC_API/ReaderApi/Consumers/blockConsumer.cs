using MassTransit;
using POC_API.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReaderApi.Consumers
{
    public class blockConsumer : IConsumer<Order>
    {
        DigitalBooksContext db = new DigitalBooksContext();
        public Task Consume(ConsumeContext<Order> context)
        {
            OrderCount pc = new OrderCount();
            var data = context.Message;
            var pcExists = db.OrderCounts.Where(x => x.BookId == data.BookId).FirstOrDefault();
            if (pcExists != null)
            {
                pcExists.Count = pcExists.Count + 1 ;
                db.OrderCounts.Update(pcExists);
                db.SaveChanges();

            }
            else {
                pc.BookId = data.BookId;
                pc.Count = 1;
                db.OrderCounts.Add(pc);
                db.SaveChanges();
            }
            return Task.CompletedTask;
        }
    }

}
