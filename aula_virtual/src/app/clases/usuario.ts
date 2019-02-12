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
  nombres?:string,
  apellidos?:string,
  username?:string,
  email?: string;
  password?: string;
  imagen?: string;
  rol?: string;
}
