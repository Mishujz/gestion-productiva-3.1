import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usarname: String;
  passward: String;

  constructor( ) { }

  ngOnInit() {
  }
  login (form:NgForm){
    console.log(form.value);
    if (form.value.email=='admin' && form.value.passward=='admin'){
   //localStorage.setItem(Key: 'email',form.value.email);
   // this.router.navigate(commands:['/profesor']);

    }
 
      

    }
  }


