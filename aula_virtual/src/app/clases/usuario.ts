export interface Usuario {
  uid?:string,
  nombres?:string,
  apellidos?:string,
  email?:string,
  username?:string,
  imagen?:string,
  rol?:boolean,
}

export interface TipoUsuario {
  key?:number,
  descripcion:string,
}

export interface Roles {
  tipo?: 1;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles: Roles;
}
