import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    _orderUrl="https://localhost:44335/order?id=";
    _orderUrlAdd="https://localhost:44335/order";
    constructor(private http:HttpClient,private _router:Router) { }
  
    getOrders(id :any){
        
        return this.http.get<any>(this._orderUrl+id);
      }
      
      addOrder(input:any){
        return this.http.post<any>(this._orderUrlAdd,input);
      }
  }