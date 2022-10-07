using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReaderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReaderController : ControllerBase
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
        [Route("loginBuy")]
        public Book GetBuy(int id)
        {
            Book bs = db.Books.Where(x => x.Id == id).FirstOrDefault();
            return bs;
        }

        [HttpGet]
        [Route("Search")]
        public IEnumerable<Book> Search(string title)
        {
            return db.Books.Where(x => x.Title == title).ToList();
        }

    }
}
