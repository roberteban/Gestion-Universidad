# Gestión Universidad

## Descripción
**Gestión Universidad** es un sistema API diseñado para administrar el registro de estudiantes, cursos y las calificaciones obtenidas en exámenes. Esta API está construida utilizando **Express.js** y **MySQL**, permitiendo crear, consultar, actualizar y eliminar registros académicos de manera sencilla y eficiente.

## Características
- **Registro de Estudiantes**: Administración de estudiantes inscritos con su legajo, nombre y correo electrónico.
- **Registro de Cursos**: Gestión de los cursos disponibles, incluyendo el código del curso, nombre, docente y descripción.
- **Registro de Notas**: Almacena las notas de los estudiantes en cada curso, incluyendo la fecha de evaluación.
- **Consultas y Modificaciones**: Permite realizar consultas y modificaciones a los registros académicos mediante distintos endpoints.

## Endpoints

- **GET /estudiantes/:legajo**: Consulta la información de un estudiante por su legajo.
- **POST /estudiantes/create**: Crea un nuevo registro de estudiante.
- **POST /notas/create**: Crea un nuevo registro de una nota de examen.
- **PUT /notas/:id/update**: Actualiza una nota de examen existente por su ID.
- **DELETE /notas/:id/delete**: Elimina un registro de examen por su ID.
- **GET /notas/:codigo/aprobados**: Consulta los exámenes aprobados (nota >= 6) de un curso según su código.

## Tecnologías Utilizadas
- **Node.js**
- **Express.js**
- **MySQL**

## Instalación y Uso

### Requisitos Previos:
- Node.js
- MySQL

### Instalación:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/Gestion-Universidad.git

2. Instala las dependencias:
   ```bash
   npm install

3. Configura la base de datos en MySQL:
   Crea una base de datos llamada `universidad` y las siguientes tablas:
   ```bash
   CREATE TABLE estudiantes (
    legajo INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100)
   );
   CREATE TABLE cursos (
    codigo INT PRIMARY KEY,
    nombre VARCHAR(100),
    docente VARCHAR(100),
    descripcion TEXT
   );
   CREATE TABLE notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    legajo_estudiante INT,
    codigo_curso INT,
    nota FLOAT,
    fecha DATE,
    FOREIGN KEY (legajo_estudiante) REFERENCES estudiantes(legajo),
    FOREIGN KEY (codigo_curso) REFERENCES cursos(codigo)
   );

4. Configura la conexión a la base de datos en el archivo conexion.js:
   ```bash
   const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'universidad'
   });

6. Inicia el servidor:
   ```bash
   npm start

7. Accede a la API a través de `http://localhost:3000`.
