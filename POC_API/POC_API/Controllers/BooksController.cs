using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DbModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
        [Route("loginBuy")]
        public Book GetBuy(int id)
        {
            Book bs = db.Books.Where(x => x.Id == id).FirstOrDefault();
            return bs;
        }

        [HttpGet]
        [Route("AuthorAllBooks")]
        public IEnumerable<Book> GetAll(int id)
        {
            return db.Books.Where(x => x.AuthorId != id).ToList();
        }


        [HttpGet]
        [Route("Search")]
        public IEnumerable<Book> Search(string title)
        {
            return db.Books.Where(x => x.Title == title ).ToList();
        }

        [HttpPost]
        public IActionResult Post([FromForm] bookModel book )
        { 
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                Book book1 = new Book();
                book1.Title = book.Title;
                book1.Price = book.Price;
                book1.PublishedDate = book.PublishedDate;
                book1.Publisher = book.Publisher;
                book1.ImagePath = dbPath;
                book1.Blocked = book.Blocked;
                book1.Author = book.Author;
                book1.AuthorId = book.AuthorId;
                book1.ActiveStatus = book.ActiveStatus;
                book1.Category = book.Category;
                book1.Content = book.Content;
                db.Books.Add(book1);
                db.SaveChanges();
            }
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
