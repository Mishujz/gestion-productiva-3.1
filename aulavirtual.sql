
CREATE TABLE tipo_Actividad (
                id_Tipo_Actividad INT AUTO_INCREMENT NOT NULL,
                descripcion VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_Tipo_Actividad)
);


CREATE TABLE cursos (
                id_Cursos INT AUTO_INCREMENT NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                codigo VARCHAR(50) NOT NULL,
                fecha_Creacion DATETIME NOT NULL,
                estado BOOLEAN NOT NULL,
                PRIMARY KEY (id_Cursos)
);


CREATE TABLE actividad (
                id_Actividad INT AUTO_INCREMENT NOT NULL,
                id_Cursos INT NOT NULL,
                id_Tipo_Actividad INT NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                descripcion VARCHAR(150) NOT NULL,
                desde DATETIME NOT NULL,
                hasta DATETIME NOT NULL,
                puntaje VARCHAR(50) NOT NULL,
                img VARCHAR(150) NOT NULL,
                PRIMARY KEY (id_Actividad)
);


CREATE TABLE preguntas (
                id_Preguntas INT AUTO_INCREMENT NOT NULL,
                id_Actividad INT NOT NULL,
                pregunta VARCHAR(300) NOT NULL,
                respuesta BOOLEAN NOT NULL,
                PRIMARY KEY (id_Preguntas)
);


CREATE TABLE tipo_usuario (
                id_Tipo_Usuario INT AUTO_INCREMENT NOT NULL,
                descripcion VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_Tipo_Usuario)
);


CREATE TABLE usuario (
                id_Usuarios INT AUTO_INCREMENT NOT NULL,
                id_Tipo_Usuario INT NOT NULL,
                nombres VARCHAR(50) NOT NULL,
                apellidos VARCHAR(50) NOT NULL,
                usuario VARCHAR(50) NOT NULL,
                contrasenia VARCHAR(50) NOT NULL,
                imagen VARCHAR(150) NOT NULL,
                email VARCHAR(50) NOT NULL,
                PRIMARY KEY (id_Usuarios)
);


CREATE TABLE notificaciones (
                id_Notificaciones INT AUTO_INCREMENT NOT NULL,
                id_Cursos INT NOT NULL,
                descripcion VARCHAR(500) NOT NULL,
                fechaPubliacion DATETIME NOT NULL,
                id_Usuarios INT NOT NULL,
                PRIMARY KEY (id_Notificaciones)
);


CREATE TABLE respuestas (
                id_Respuesta INT AUTO_INCREMENT NOT NULL,
                id_Usuarios INT NOT NULL,
                id_Actividad INT NOT NULL,
                calificacion INT NOT NULL,
                respuesta VARCHAR(1000) NOT NULL,
                fecha DATETIME NOT NULL,
                PRIMARY KEY (id_Respuesta)
);


CREATE TABLE respuestaLeccion (
                id_Respuesta_Leccion INT AUTO_INCREMENT NOT NULL,
                id_Usuarios INT NOT NULL,
                id_Preguntas INT NOT NULL,
                fecha DATETIME NOT NULL,
                respuesta BOOLEAN NOT NULL,
                calificacion INT NOT NULL,
                PRIMARY KEY (id_Respuesta_Leccion)
);


CREATE TABLE usuario_curso (
                id_usuario_curso INT AUTO_INCREMENT NOT NULL,
                id_Cursos INT NOT NULL,
                id_Usuarios INT NOT NULL,
                periodo DATETIME NOT NULL,
                PRIMARY KEY (id_usuario_curso)
);


ALTER TABLE actividad ADD CONSTRAINT tipo_actividad_actividad_fk
FOREIGN KEY (id_Tipo_Actividad)
REFERENCES tipo_Actividad (id_Tipo_Actividad)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE actividad ADD CONSTRAINT cursos_actividad_fk
FOREIGN KEY (id_Cursos)
REFERENCES cursos (id_Cursos)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE notificaciones ADD CONSTRAINT cursos_notificaciones_fk
FOREIGN KEY (id_Cursos)
REFERENCES cursos (id_Cursos)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE usuario_curso ADD CONSTRAINT cursos_usuario_curso_fk
FOREIGN KEY (id_Cursos)
REFERENCES cursos (id_Cursos)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE respuestas ADD CONSTRAINT actividad_respuestas_fk
FOREIGN KEY (id_Actividad)
REFERENCES actividad (id_Actividad)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE preguntas ADD CONSTRAINT actividad_preguntas_fk
FOREIGN KEY (id_Actividad)
REFERENCES actividad (id_Actividad)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE respuestaLeccion ADD CONSTRAINT preguntas_respuestaleccion_fk
FOREIGN KEY (id_Preguntas)
REFERENCES preguntas (id_Preguntas)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE usuario ADD CONSTRAINT tipo_usuario_usuarios_fk
FOREIGN KEY (id_Tipo_Usuario)
REFERENCES tipo_usuario (id_Tipo_Usuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE usuario_curso ADD CONSTRAINT usuario_usuario_curso_fk
FOREIGN KEY (id_Usuarios)
REFERENCES usuario (id_Usuarios)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE respuestaLeccion ADD CONSTRAINT usuario_respuestaleccion_fk
FOREIGN KEY (id_Usuarios)
REFERENCES usuario (id_Usuarios)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE respuestas ADD CONSTRAINT usuario_respuestas_fk
FOREIGN KEY (id_Usuarios)
REFERENCES usuario (id_Usuarios)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE notificaciones ADD CONSTRAINT usuario_notificaciones_fk
FOREIGN KEY (id_Usuarios)
REFERENCES usuario (id_Usuarios)
ON DELETE NO ACTION
ON UPDATE NO ACTION;
