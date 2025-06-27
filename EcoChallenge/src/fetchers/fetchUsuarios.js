import db from '../db/database';

// Agregar usuario
export const agregarUsuario = async (usuario) => {
  const { nombre, email, edad, barrio, fotoPerfil, puntajeTotal = 0 } = usuario;

  try {
    await db.runAsync(
      `INSERT INTO usuarios (nombre, email, edad, barrio, fotoPerfil, puntajeTotal) 
       VALUES (?, ?, ?, ?, ?, ?);`,
      [nombre, email, edad, barrio, fotoPerfil, puntajeTotal]
    );
    console.log('Usuario insertado');
  } catch (error) {
    console.log('Error al insertar usuario:', error);
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM usuarios;');
    return result;
  } catch (error) {
    console.log('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener usuario por email
export const obtenerUsuarioPorEmail = async (email) => {
  try {
    const result = await db.getFirstAsync('SELECT * FROM usuarios WHERE email = ?;', [email]);
    return result;
  } catch (error) {
    console.log('Error al obtener usuario:', error);
    return null;
  }
};

// Eliminar usuario por ID
export const eliminarUsuarioPorId = async (id) => {
  try {
    await db.runAsync('DELETE FROM usuarios WHERE id = ?;', [id]);
    console.log('Usuario eliminado');
  } catch (error) {
    console.log('Error al eliminar usuario:', error);
  }
};

// Modificar usuario por ID
export const modificarUsuario = async (usuarioMod) => {
  const { id, nombre, email, edad, barrio, fotoPerfil, puntajeTotal } = usuarioMod;

  try {
    await db.runAsync(
      `UPDATE usuarios 
       SET nombre = ?, email = ?, edad = ?, barrio = ?, fotoPerfil = ?, puntajeTotal = ? 
       WHERE id = ?;`,
      [nombre, email, edad, barrio, fotoPerfil, puntajeTotal, id]
    );
    console.log('Usuario modificado');
  } catch (error) {
    console.log('Error al modificar usuario:', error);
  }
};
