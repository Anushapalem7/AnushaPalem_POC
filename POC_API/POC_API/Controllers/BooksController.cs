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
    public class BooksController : ControllerBase
    {
        DigitalBooksContext db = new DigitalBooksContext();
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return db.Books;
        }
        [HttpGet]
        [Route("ReaderBooks")]
        public IEnumerable<Book> GetUnBlocked()
        {
            return db.Books.Where(x => x.Blocked == false).ToList();
        }
        [HttpGet]
        [Route("AuthorBooks")]
        public IEnumerable<Book> Get(int id)
        {
            return db.Books.Where(x => x.AuthorId == id).ToList();
        }

        [HttpGet]
        [Route("AuthorAllBooks")]
        public IEnumerable<Book> GetAll(int id)
        {
            return db.Books.Where(x => x.AuthorId != id).ToList();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Book book)
        {
            db.Books.Add(book);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }
        [HttpPut]
        public IActionResult Put([FromBody] Book book)
        {
            db.Books.Update(book);
            db.SaveChanges();
            var response = new { Status = "Success" };
            return Ok(response);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var data = db.Books.Where(x => x.Id == id).FirstOrDefault();
            db.Books.Remove(data);
            db.SaveChanges();
            //
            var response = new { Status = "Success" };
            return Ok(response);
        }

    }
}
