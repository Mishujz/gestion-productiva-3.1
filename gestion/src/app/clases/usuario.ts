export interface Usuario {
  uid?:string,
  nombres?:string,
  apellidos?:string,
  email?:string,
  username?:string,
  imagen?:string,
  rol?:boolean,
}

export interface Rol {
  uid?:string,
  descripcion:string,
}

export interface Roles {
  tipo?: number;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  rol?: string;
}
