import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  downloadURL: Observable<string>;
  imagen:string =null
  usuarioForm = this.fb.group({
    email: ['', Validators.required],
    usuario: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
  })
  imageUrl: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
  ) {
    this.authService.getAuth().subscribe(data => {
      this.authService.getUser(data.uid).subscribe(user => {
        //obtiene id usuario
        this.userUid = data.uid
        this.usuario = user
        this.setFormValues(user)
        if (user.imagen) {
            this.imagen=user.imagen
        }
      })
    })
  }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  ngOnInit() {

  }
  actualizarUsuario() {
    // obtiene datos del formulario y actuliza perfil
    this.authService.actualizarUsuario(this.usuarioForm.value, this.userUid).then(() => {
      this.toastr.success('Perfil actualizado!', 'Exito!');
    })
  }
  setFormValues(user) {
    //asignar valores a formulario
    this.usuarioForm.get('email').setValue(user.email)
    this.usuarioForm.get('nombres').setValue(user.nombres)
    this.usuarioForm.get('apellidos').setValue(user.apellidos)
    this.usuarioForm.get('usuario').setValue(user.usuario)
  }

  onUpload(e) {
    //subir imagen a bd firebase y obtener el enlace de desacarga para agragarlo al campo de usuario
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${this.userUid}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(url => { this.imageUrl = url; this.authService.actualizarImagenUsuario(url,this.userUid) })
      })).subscribe()
  }
}
