import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Book } from './book.model';
import { BookService } from '../Services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  books: Book[] = [];
  allBooks: Book[] = [];
  book:Book = new Book();
  public hideCreate = true;
  public hideAllBooks = true;
  public isEdit = false;
  public isBlocked = false;
  public userId = "";
  public userName = localStorage.getItem('userName');
  public userJson = localStorage.getItem('userId');
  
  
  constructor(private _service:BookService,private _router:Router,private http: HttpClient) { }
  ErrorMessage:any='';
 

  ngOnInit(): void {
    this.userId = this.userJson !== null ? JSON.parse(this.userJson) : " ";
    this.GetDataFromServer();
    this.book.activeStatus="Active";
  }
  // GetDataFromServer(){
  //   this.http.get("http://localhost:3000/books").subscribe(res=>this.Success(res),res=>console.log(res));
  
  // }
  
  GetDataFromServer(){
    this._service.getAuthorBooks(this.userId).subscribe(res=>this.Success(res),res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }
  onSelected(value:string): void {
		this.book.activeStatus = value;
    console.log(this.book.activeStatus);
	}
  
  Edit(input:any){
    this.book = input;
    this.isEdit = true;
    this.hideCreate = false;
    this.hideAllBooks = false;
  }
  Block(input:any){
    this.book = input;
    var change = !(this.isBlocked);
    this.isEdit = true;
    this.isBlocked = change;
    this.Add();
  }
  delete(id:any){
     this._service.deleteBook(id).subscribe(res=>{
      this._router.navigate(['author']);
      this.GetDataFromServer();
     },res=>
     {
       console.log(res);
       this.ErrorMessage="Some error have occured";
       document.getElementById('btnErrorMsg')?.click();
     });
  }

  Add(){
    
    
    debugger;
    if(this.isEdit){
      var bookData = {
        Id : this.book.id,
        Title : this.book.title,
        Author : this.userName,
        AuthorId : +(this.userId),
        Publisher : this.book.publisher,
        Category : this.book.category,
        Content : this.book.content,
        ActiveStatus :this.book.activeStatus,
        Blocked :false,
        Price : +(this.book.price),
        PublishedDate : "2022-09-19"
      };
      if(this.isBlocked)
      bookData.Blocked = !(this.book.blocked);
      this._service.editBook(bookData).subscribe(res=>{
        this._router.navigate(['author']);
        this.GetDataFromServer();
        this.hideAllBooks = true;
        this.hideCreate=true;
        this.book = new Book();
       },res=>
       {
         console.log(res);
         this.ErrorMessage="Some error have occured";
         document.getElementById('btnErrorMsg')?.click();
       });
    }
    else{
      var bookData2 = {
        Title : this.book.title,
        Author : this.userName,
        AuthorId : +(this.userId),
        Publisher : this.book.publisher,
        Category : this.book.category,
        Content : this.book.content,
        ActiveStatus :this.book.activeStatus,
        Blocked :false,
        Price : +(this.book.price),
        PublishedDate : "2022-09-19"
      };
      this._service.addBook(bookData2).subscribe(res=>{
        this._router.navigate(['author']);
        this.GetDataFromServer();
        this.hideAllBooks = true;
        this.hideCreate=true;
        this.book = new Book();
       },res=>
       {
         console.log(res);
         this.ErrorMessage="Some error have occured";
         document.getElementById('btnErrorMsg')?.click();
       });
    }
    
  }
  ShowBooks(){
    this.hideCreate = true;
    this.hideAllBooks = true;
  }
  ShowCreate(){
    this.hideCreate = false;
    this.hideAllBooks = false;
  }
  Success(input:any){
    debugger;
    console.log(input);
    this.books=input;
    console.log(this.books);
  }
  SuccessAll(input:any){
    debugger;
    console.log(input);
    this.allBooks=input;
    console.log(this.allBooks);
  }
  uploadFile(files:any){
    if(files.length==0){
      return ;
    }

    let fileToUpload=<File>files[0];
    const formData=new FormData();

    formData.append('file',fileToUpload,fileToUpload.name);
    this._service.upload(formData).subscribe(res=>{
      this._router.navigate(['author']);
      this.GetDataFromServer();
     },res=>
     {
       console.log(res);
       this.ErrorMessage="Some error have occured";
       document.getElementById('btnErrorMsg')?.click();
     });
  }

}
