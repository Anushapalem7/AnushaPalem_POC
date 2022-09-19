import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    _loginUrl="https://localhost:44351/api/user/login-user";
    _registerUrl="https://localhost:44351/api/user";
    _readerBooks="https://localhost:44351/api/books/ReaderBooks"
    _booksUrl ="https://localhost:44351/api/books";
    idUrl ="https://localhost:44351/api/books?id=";
    constructor(private http:HttpClient,private _router:Router) { }
  getReaderBooks(){
     return this.http.get<any>(this._readerBooks);
  }
  getBooks(){
    return this.http.get<any>(this._booksUrl);
 }
    addBook(input:any){
      return this.http.post<any>(this._booksUrl,input);
    }
    editBook(input:any){
      return this.http.put<any>(this._booksUrl,input);
    }
    deleteBook(id:any){
      debugger;
      return this.http.delete<any>(this.idUrl+id);
    }


    
  }