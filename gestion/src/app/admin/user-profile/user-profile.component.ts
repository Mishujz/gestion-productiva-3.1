import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { UserInterface } from '../../clases/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario: UserInterface
  userUid: string
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  // usuarioForm: FormGroup;

  usuarioForm = this.fb.group({
    email: ['', Validators.required],
    usuario: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    imagen: [''],
    // clave:['', Validators.required ],
  })
  downloadURL: any;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(data => {
      this.authService.getUser(data.uid).subscribe(user => {
        this.userUid = data.uid
        this.usuario = user
        this.setFormValues(user)
      })
    })
  }
  actualizarUsuario() {
    this.authService.actualizarUsuario(this.usuarioForm.value, this.userUid).then(() => {
      this.toastr.success('Perfil actualizado!', 'Exito!');
    })
  }
  setFormValues(user) {
    this.usuarioForm.get('email').setValue(user.email)
    this.usuarioForm.get('nombres').setValue(user.nombres)
    this.usuarioForm.get('apellidos').setValue(user.apellidos)
    this.usuarioForm.get('usuario').setValue(user.usuario)

  }
  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {

      this.urlImage = ref.getDownloadURL()
      // this.authService.actualizarImagenUsuario(this.urlImage,this.userUid)
    }
  )).subscribe();
  }
}
