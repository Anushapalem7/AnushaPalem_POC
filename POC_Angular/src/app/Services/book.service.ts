import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    _loginUrl="https://localhost:44351/api/user/login-user";
    _registerUrl="https://localhost:44351/api/user";
    _readerBooks="https://localhost:44351/api/books/ReaderBooks";
    _searchBooks ="https://localhost:44351/api/books/Search?title=";
    _authorBooks="https://localhost:44351/api/books/AuthorBooks?id=";
    _buyBook = "https://localhost:44351/api/books/loginBuy?id=";
    _authorAllBooks="https://localhost:44351/api/books/AuthorAllBooks?id=";
    _booksUrl ="https://localhost:44351/api/books";
    idUrl ="https://localhost:44351/api/books?id=";
    uploadUrl = "https://localhost:44351/api/upload";
    constructor(private http:HttpClient,private _router:Router) { }
  getReaderBooks(){
     return this.http.get<any>(this._readerBooks);
  }
  getAuthorBooks(id :any){
   
    return this.http.get<any>(this._authorBooks+id);
  }

  getBuyBooks(id :any){
   debugger;
    return this.http.get<any>(this._buyBook+id);
  }
  SearchResult(input : any){
 return this.http.get<any>(this._searchBooks+input)
  }
  getAuthorAllBooks(id :any){
    debugger
    return this.http.get<any>(this._authorAllBooks+id);
  }
  getBooks(){
    return this.http.get<any>(this._booksUrl);
 }
    addBook(input:any){
      return this.http.post<any>(this._booksUrl,input);
    }
    upload(input:any){
      return this.http.post<any>(this.uploadUrl,input);
    }

    editBook(input:any){
      return this.http.put<any>(this._booksUrl,input);
    }
    deleteBook(id:any){
      debugger;
      return this.http.delete<any>(this.idUrl+id);
    }


    
  }