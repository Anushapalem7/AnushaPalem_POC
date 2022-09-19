import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../author/book.model';
import { BookService } from '../Services/book.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  books: Book[] = [];
  public hideCreate = true;
  public hideAllBooks = true;
  constructor(private _service:BookService,private _router:Router,private http: HttpClient) { }
  ErrorMessage:any='';
 

 

  ngOnInit(): void {
    this.GetDataFromServer();
  }
  GetDataFromServer(){
    this._service.getReaderBooks().subscribe(res=>this.Success(res),res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
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
  }

  
}
