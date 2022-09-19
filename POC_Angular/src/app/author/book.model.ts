import { DATE_PIPE_DEFAULT_TIMEZONE } from "@angular/common";

export class Book{
    id:number=0;
    title:string='';
    author:string='';
    publisher:string='';
    category:string ='';
    content:string='';
    activeStatus:string='';
    blocked:boolean=false;
    price:number=0;
    publishedDate:Date = new Date;
}