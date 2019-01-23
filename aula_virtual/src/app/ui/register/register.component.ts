import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.registerForm = this.fb.group({
      email: ['',Validators.required],
      clave:['', Validators.required ],
      rol:['', Validators.required ],
    })
  }

  roles=[
    {
      tipo: "Profesor"
    },{
      tipo: "Alumno"
    }
  ]


  onAddUser() {
    this.authService.registerUser(this.registerForm.value)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              displayName: '',
              photoURL: 'asa'
            }).then(() => {
              this.router.navigate(['dashboard']);
            }).catch((error) => console.log('error', error));
          }
        });
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
