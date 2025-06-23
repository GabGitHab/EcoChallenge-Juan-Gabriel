import db from '../db/database';

// Funcion para agregar un usuario
export const agregarUsuario = (usuario, callback) => {
    //Desestructuramos el usuario del parametro
  const { nombre, email, edad, barrio, fotoPerfil, puntajeTotal = 0 } = usuario;

//funcion para insertar un usuario en la base de datos

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO usuarios (nombre, email, edad, barrio, fotoPerfil, puntajeTotal) 
       VALUES (?, ?, ?, ?, ?, ?);`,
      [nombre, email, edad, barrio, fotoPerfil, puntajeTotal],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al insertar usuario:', error); return false; }
    );
  });
};

// Obtener todos los usuarios
export const obtenerUsuarios = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM usuarios;',
      [],
      (_, result) => callback?.(result.rows._array),
      (_, error) => { console.log('Error al obtener usuarios:', error); return false; }
    );
  });
};

export const obtenerUsuarioPorEmail = (email, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM usuarios WHERE email = ?;',
            [email],
            (_, result) => callback?.(result.rows._array[0]),
            (_, error) => { console.log('Error al obtener usuario', error); return false;}
        );
    });
  };


//eliminar usuario por id
export const eliminarUsuarioPorId = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM usuarios WHERE id = ?;',
      [id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al eliminar usuario:', error); return false; }
    );
  });
};

// Modificar usuario por id 
export const modificarUsuario = (usuarioMod, callback) => {
  const { nombre, email, edad, barrio, fotoPerfil, puntajeTotal } = usuarioMod;

  db.transaction(tx => {
    tx.executeSql(
      `UPDATE usuarios 
       SET nombre = ?, email = ?, edad = ?, barrio = ?, fotoPerfil = ?, puntajeTotal = ? 
       WHERE id = ?;`,
      [nombre, email, edad, barrio, fotoPerfil, puntajeTotal, id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al modificar usuario:', error); return false; }
    );
  });
};

