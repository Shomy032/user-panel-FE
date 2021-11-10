import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface loginData {
  email : string ,
  password : string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http : HttpClient) { }

  form! : FormGroup;

  ngOnInit(): void {
    this.initLoginForm()
  }

  initLoginForm(){
    this.form = new FormGroup({
      email : new FormControl("" , [Validators.required , Validators.email]) ,
      password : new FormControl("" , [Validators.required , Validators.minLength(6)])
    })
  }

  get emailControl(){
    return this.form?.controls?.email;
  }

  get passwordControl(){
    return this.form?.controls?.password;
  }

  onSubmit(){  
    this.resetError()
    if(this.form.invalid){
      return;
    }
    this.toggleLoading();
    const email = this.emailControl?.value
    const password = this.passwordControl?.value;
    const payload = {
      email , password
    }
    this.loginUser(payload).subscribe(
      this.userLoginSuccessfull.bind(this),
      this.userLoginFail.bind(this)
      )
  }

  loginUser(payload : loginData){
    const url = "http://localhost:3000/"
     return this.http.post(url + 'login' , payload);
  }

  error = "";

  userLoginSuccessfull(){
    console.log("good")
    this.toggleLoading();
    this.resetError();
  }

  userLoginFail(){
    console.log("bad")
    this.toggleLoading();
    this.error = "Something went wrong , please try again later.";  
  }

    resetError(){
      this.error = "";
    }
  
    loading = false;

    toggleLoading(){
      this.loading = !this.loading;
    }
  
    show = true;

    showPassword() : string {
      return this.show ? "password" : "text";
    }
    
    toggleShowPassword(){
      this.show = !this.show;
    }

    get icon(){
      return this.show ? "visibility_off" : "visibility";
    }
}


