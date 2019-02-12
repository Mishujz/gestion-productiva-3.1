import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../clases/usuario';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles: Observable<Rol[]>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  registerForm: FormGroup;


  ngOnInit() {
    this.roles = this.authService.getRoles()
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      clave: ['', [Validators.required,Validators.minLength(6)]],
      rol: ['', Validators.required],
    })
  }




  onAddUser() {
    console.log(this.registerForm.value)
    this.authService.registerUser(this.registerForm.value)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
              this.router.navigate(['perfil']);
          })
      }).catch(err => console.log('err', err.message));
  }
  // onLoginGoogle(): void {
  //   this.authService.loginGoogleUser()
  //     .then((res) => {
  //       this.onLoginRedirect();
  //     }).catch(err => console.log('err', err.message));
  // }
  // onLoginFacebook(): void {
  //   this.authService.loginFacebookUser()
  //     .then((res) => {
  //       this.onLoginRedirect();
  //     }).catch(err => console.log('err', err.message));
  // }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}
