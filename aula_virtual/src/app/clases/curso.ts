export interface Curso {
  uid?:string,
  nombre:string,
  codigo:string,
  fechaInicio?:Date,
  fechaFin?:Date,
  fechaCreacion?:Date,
  estado?:string,
  idUsuario?:string,
}

export interface Actividad {
  uid?:string,
  nombre:string,
  descripcion:string,
  tipo:string,
  fechaInicio?:Date,
  fechaFin?:Date,
  puntaje?:number,
  img?:string,
  idCurso?:string,
}
export interface UsuarioCurso {
  uid?:string,
  idCurso?:string,
  idUsuario?:string,
}

export interface TipoActividad {
  uid?:string,
  descripcion:string,
}

export interface Pregunta {
  uid?:string,
  preguntas:[],
  idActividad?:string,
}
export interface Respuesta {
  uid?:string,
  respuesta?:string,
  imagen?:string,
  nomUsuario?:string,
  fecha?:Date,
  idActividad?:string,
  idUsuario?:string,
  calificacion?:number,
  activo?:boolean,
}
