import { AuthService } from '../../servicios/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService:AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['',Validators.required],
      clave:['', Validators.required ],
    })
  }
  login(){
    this.authService.loginCorreo(this.loginForm.value);
}

}
