// Importamos la librería mysql
const mysql = require('mysql');

// Creamos la conexión con los parámetros de la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',    // Servidor donde se aloja MySQL
    user: 'root',         // Usuario de la base de datos
    password: '',         // Contraseña del usuario (en este caso, sin contraseña)
    database: 'universidad'  // Nombre de la base de datos que creamos
});

// Conectamos a la base de datos
conexion.connect((error) => {
    if (error) {
        console.error('Error de conexión:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Exportamos la conexión para utilizarla en otros archivos
module.exports = conexion;
