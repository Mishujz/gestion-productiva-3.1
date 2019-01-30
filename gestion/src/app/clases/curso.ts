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

export interface TipoActividad {
  uid?:string,
  descripcion:string,
}

export interface Pregunta {
  uid?:string,
  preguntas:[],
  idActividad?:string,
}
