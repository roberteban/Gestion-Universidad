// Importamos las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const conexion = require('./conexion');  // Importamos la conexión a la base de datos
const app = express();

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(bodyParser.json());

// Endpoint para consultar un estudiante según su legajo
app.get('/estudiantes/:legajo', (req, res) => {
    const legajo = req.params.legajo;
    // Consultamos en la base de datos el estudiante con el legajo proporcionado
    const sql = 'SELECT * FROM estudiantes WHERE legajo = ?';
    conexion.query(sql, [legajo], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint para crear un nuevo registro de estudiante
app.post('/estudiantes/create', (req, res) => {
    const { legajo, nombre, email } = req.body;
    const sql = 'INSERT INTO estudiantes (legajo, nombre, email) VALUES (?, ?, ?)';
    
    // Insertamos el nuevo registro en la base de datos
    conexion.query(sql, [legajo, nombre, email], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).json({ message: 'Estudiante creado exitosamente', id: results.insertId });
        }
    });
});

// Endpoint para crear un nuevo registro de examen
app.post('/notas/create', (req, res) => {
    const { legajo_estudiante, codigo_curso, nota, fecha } = req.body;
    const sql = 'INSERT INTO notas (legajo_estudiante, codigo_curso, nota, fecha) VALUES (?, ?, ?, ?)';
    
    // Insertamos el nuevo registro de examen
    conexion.query(sql, [legajo_estudiante, codigo_curso, nota, fecha], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(201).json({ message: 'Nota creada exitosamente', id: results.insertId });
        }
    });
});

// Endpoint para modificar un registro de examen por ID
app.put('/notas/:id/update', (req, res) => {
    const id = req.params.id;
    const { legajo_estudiante, codigo_curso, nota, fecha } = req.body;
    const sql = 'UPDATE notas SET legajo_estudiante = ?, codigo_curso = ?, nota = ?, fecha = ? WHERE id = ?';

    // Actualizamos el registro con el ID correspondiente
    conexion.query(sql, [legajo_estudiante, codigo_curso, nota, fecha, id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Registro no encontrado' });
        } else {
            res.status(200).json({ message: 'Nota actualizada exitosamente' });
        }
    });
});

// Endpoint para eliminar un registro de examen por ID
app.delete('/notas/:id/delete', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM notas WHERE id = ?';

    // Eliminamos el registro con el ID correspondiente
    conexion.query(sql, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Registro no encontrado' });
        } else {
            res.status(200).json({ message: 'Nota eliminada exitosamente' });
        }
    });
});

// Endpoint para consultar los exámenes aprobados de un curso (nota >= 6)
app.get('/notas/:codigo/aprobados', (req, res) => {
    const codigo = req.params.codigo;
    const sql = 'SELECT * FROM notas WHERE codigo_curso = ? AND nota >= 6';

    // Consultamos los exámenes aprobados del curso con el código proporcionado
    conexion.query(sql, [codigo], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json(results);
        }
    });
});

// Configuramos el servidor para escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor Express corriendo en el puerto 3000');
});
