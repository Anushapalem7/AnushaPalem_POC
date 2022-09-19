import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { LoginServiceService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPopup =false;
  user: User = new User();
  userType:string ='';

  constructor(private _service:LoginServiceService,private _router:Router,private http: HttpClient) { }
  ErrorMessage:any='';

  
  ngOnInit(): void {
  }
  OpenPopup(){
    debugger;
    var pop = !(this.showPopup);
    this.showPopup = pop;
  }

  loginUser(){
    this._service.loginUser(this.user).subscribe(res=>{
      localStorage.setItem('userName',this.user.UserName);
      localStorage.setItem('token',res.token);
      if(this.userType == "Author")
      this._router.navigate(['author']);
      if(this.userType == "Reader")
      this._router.navigate(['reader']);
    },res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }

  selectType(event:any){
    this.userType = event.target.value;
    console.log(this.userType);
  }
  Register(){
    debugger;
    var userdto = {
      UserName: this.user.UserName,
      Password: this.user.Password,
      Email: this.user.Email
    };
    
    this.http.post("https://localhost:44351/api/user", userdto).subscribe(res => { this._router.navigate(['login']);}, res => console.log(res))

    this.user = new User();
  }

}
