import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../author/book.model';
import { Order } from '../Models/order.model';
import { BookService } from '../Services/book.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  books: Book[] = [];
  allBooks: Book[] = [];
  book: Book = new Book();
  count : number = 0;
  SearchResult: Book[] = [];
  orders: Order[] = [];
  order: Order = new Order();
  public isSearch = false;
  public saveSuccess = false;
  public hideCreate = true;
  public hideAllBooks = true;
  public showOrdres = false;
  public showPopup = false;
  public CBuy = false;
  public userId = "";
  public bookId = "";
  public userName = localStorage.getItem('userName');
  public userJson = localStorage.getItem('userId');
  public formElement = document.getElementById("myForm");
  public bookIdLS = localStorage.getItem('bookId');
  formDisplay: any;
  constructor(private _service: BookService,private _oService: OrderService, private _router: Router, private http: HttpClient) { }
  ErrorMessage: any = '';
  public isLoggedIn = false;
  public showlogin = false;





  ngOnInit(): void {
   
    if(this.userJson == "empty")
    {
      this.isLoggedIn = false;
    }
    else{
      this.userId = (this.userJson !== null ) ? JSON.parse(this.userJson) : " ";
      if(this.bookIdLS != "empty")
      this.bookId = (this.bookIdLS !== null ) ? JSON.parse(this.bookIdLS) : " ";
     this.isLoggedIn = true;
    }
    if(this.bookId != '0' && this.bookIdLS != 'empty')
    this.count = 1;
    else this.count = 0;
    this.GetDataFromServer();
    if(this.userJson != "empty")
    debugger;
    this.getOrders();
    this.formDisplay = this.formElement !== null ? this.formElement : " ";
    console.log(this.userId);
  }
  GetDataFromServer() {
    this._service.getReaderBooks().subscribe(res => this.Success(res), res => {
      console.log(res);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }

  GetBuyBook() {
    this._service.getBuyBooks(this.bookId).subscribe(res => this.SuccessBuyBook(res), res => {
      console.log(res);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
    debugger;
  }
  cart(){
    this.GetBuyBook();
    this.CBuy = true;
    this.openForm(this.book);

  }

  SuccessBuyBook(input : any){
    debugger;
 this.book = input;
  }



  showOrders() {
    if (this.isLoggedIn == false) {
      this._router.navigate(['login']);
    }
    else {
      this.showOrdres = true;
      this.hideCreate = true;
      this.hideAllBooks = false;
      this.showPopup = false;
    }
  }

  openForm(input: any) {
    if(this.isLoggedIn == true)
  {
    this.book = input;
    this.showOrdres = false;
    this.hideCreate = true;
    this.hideAllBooks = false;
    this.showPopup = true;
  }
  
  else{
    localStorage.setItem('bookId', input.id);
    this.showlogin = true
    if(this.isLoggedIn == false)
    {
    setTimeout(() => {
      this.showlogin = false;
    this._router.navigate(['login']);
     }, 1000);
    }
  }
  }

  logOut() {
   
    localStorage.setItem('token', "empty");
    localStorage.setItem('userName',"empty");
    localStorage.setItem('userId',"empty");
    this._router.navigate(['login']);
     
  }


  ShowBooks() {
    this.showOrdres = false;
    this.hideCreate = true;
    this.hideAllBooks = true;
    this.showPopup = false;
    this.books = this.allBooks;
    this.book = new Book();
  }
  ShowCreate() {
    this.showOrdres = false;
    this.hideCreate = false;
    this.hideAllBooks = false;
    this.showPopup = false;
  }
  Success(input: any) {
    this.saveSuccess = true;
    setTimeout(() => { this.saveSuccess = false; }, 2000);
    console.log(input);
    this.books = input;
    this.allBooks = input;
    this.book = new Book();
    if(this.userJson != "empty")
    this.getOrders();
  }

  SuccessOrders(input: any) {
    // this.getOrders();
    this.orders = input;
  }

  SuccessSearch(input: any) {

    debugger;
    this.SearchResult = input;
    console.log("search result : " + input);
    this.books = this.SearchResult;
    this.hideAllBooks = true;
    this.isSearch = true;
  }


  AddOrder() {
    if(this.CBuy == true)
    {
      this.count = 0;
      localStorage.setItem('bookId','empty')
    }
    var orderDto = {
      BookId: this.book.id,
      BookTitle: this.book.title,
      UserId: + (this.userId),
      PaymentType: this.order.paymentType,
      Price: this.book.price,
      OrderDate: "2022-09-23"

    };
    this._oService.addOrder(orderDto).subscribe(res => this.Success(res), res => {
      console.log(res);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
    this.showOrdres = true;
    this.showPopup = false;
    this.order = new Order();
  }

  getOrders() {
    this._oService.getOrders(this.userId).subscribe(res => this.SuccessOrders(res), res => {
      console.log(res);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }
  selectType(event: any) {
    this.order.paymentType = event.target.value;
    console.log("payment :" + this.order.paymentType);
  }

  Search() {

    debugger;
    this._service.SearchResult(this.book.title).subscribe(res => this.SuccessSearch(res), res => {
      console.log(res);
      this.ErrorMessage = "Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }

reload(){
  window.location.reload();
}


}
