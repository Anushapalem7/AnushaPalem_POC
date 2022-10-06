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
  myBooks: Book[] = [];
  allBooks: Book[] = [];
  book:Book = new Book();
  public hideCreate = true;
  public hideAllBooks = true;
  public isEdit = false;
  public isBlocked = false;
  public isNotReader = true;
  public saveSuccess = false;
  public showPopup = false;
  public userId = "";
  public userName = localStorage.getItem('userName');
   user:string = "";
  public userJson = localStorage.getItem('userId');
  public formData=new FormData();
 fileToUpload: any;

  
  
  constructor(private _service:BookService,private _router:Router,private http: HttpClient) { }
  ErrorMessage:any='';
 

  ngOnInit(): void {
    this.userId = this.userJson !== null ? JSON.parse(this.userJson) : " ";
    this.user = this.userName !== null ? this.userName : "";
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

    this._service.getAuthorAllBooks(this.userId).subscribe(res=>this.SuccessAll(res),res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });

  }
  onSelected(value:string): void {
    debugger;
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
        this.saveSuccess =true;
        this.hideAllBooks = true;
        this.hideCreate=true;
        setTimeout(() => { this.saveSuccess = false }, 2000);

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

      const uploadData = new FormData();
      uploadData.append('image', this.fileToUpload,this.fileToUpload.name);
      uploadData.append('Title', this.book.title);
      uploadData.append('Price', this.book.price.toString());
      uploadData.append('Category', this.book.category);
      uploadData.append('Author', this.user);
      uploadData.append('ActiveStatus', this.book.activeStatus);
      console.log( "Active Status in form data :"+this.book.activeStatus);
      uploadData.append('Content', this.book.content);
      uploadData.append('Publisher', this.book.publisher);
      uploadData.append('PublishedDate',  "2022-09-19");
      uploadData.append('Blocked', 'false');
      uploadData.append('AuthorId', this.userId);
      this._service.addBook(uploadData).subscribe(res=>{
       this.saveSuccess = true;
       this.hideAllBooks = true;
       this.hideCreate=true;
        setTimeout(() => { this.saveSuccess = false }, 2000);
        this.GetDataFromServer();
        this.book = new Book();
       },res=>
       {
         console.log(res);
         this.ErrorMessage="Some error have occured";
         document.getElementById('btnErrorMsg')?.click();
       });
    }
    
  }

  
  openForm(input : any) {
    this.book = input;
this.hideCreate = true;
this.hideAllBooks = false;

    this.showPopup = true;
  }

  ShowBooks(){
    this.books = this.myBooks;
    this.hideCreate = true;
    this.hideAllBooks = true;
    this.isNotReader = true;
  }
  ShowCreate(){
    this.hideCreate = false;
    this.hideAllBooks = false;
  }
  Showother(){
    this.hideAllBooks = true;
    this.hideCreate = true;
    this.isNotReader = false;
    this.books= this.allBooks;
  }

  Success(input:any){
    debugger;
    console.log(input);
    this.myBooks=input;
    this.books=this.myBooks
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

    this.fileToUpload=<File>files[0];
    this.formData.append('file',this.fileToUpload,this.fileToUpload.name);
    
    // this._service.upload(formData).subscribe(res=>{
    //   this._router.navigate(['author']);
    //   this.GetDataFromServer();
    //  },res=>
    //  {
    //    console.log(res);
    //    this.ErrorMessage="Some error have occured";
    //    document.getElementById('btnErrorMsg')?.click();
    //  });
  }

}
