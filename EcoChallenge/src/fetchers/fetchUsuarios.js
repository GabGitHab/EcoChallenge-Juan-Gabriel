import { Alert } from 'react-native';
import { getDb } from '../db/BaseDeDatos';

// Agregar usuario
export const agregarUsuario = async (usuario) => {
  const { nombre, email, edad, barrio, fotoPerfil, puntajeTotal = 0 } = usuario;

  try {
    const db = await getDb();

    await db.runAsync(
      `INSERT INTO usuarios (nombre, email, edad, barrio, fotoPerfil, puntajeTotal) 
       VALUES (?, ?, ?, ?, ?, ?);`,
      [nombre, email, edad, barrio, fotoPerfil, puntajeTotal]
    );
    Alert.alert('Usuario insertado');
    console.log("usuario insertado");
  } catch (error) {
    console.log('Error al insertar usuario:', error);
    Alert.alert('Error al insertar usuario:', error);
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {  
  try {
    const db = await getDb();
    const result = await db.getAllAsync('SELECT * FROM usuarios;');
    console.log('Usuarios obtenidos:', result);
    return result;
  } catch (error) {
    console.log('Error al obtener usuarios:', error);
    return [];
  }
};

// Obtener usuario por email
export const obtenerUsuarioPorNombre = async (nombre) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync('SELECT * FROM usuarios WHERE nombre = ?;', [nombre]);
    return result;
  } catch (error) {
    console.log('Error al obtener usuario:', error);
    return [];
  }
};

// Eliminar usuario por ID
export const eliminarUsuarioPorId = async (id) => {
  try {
    const db = await getDb();
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
    const db = await getDb();
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

export const obtenerUsuarioPorId = async (id) => {
  const idNumber = parseInt(id, 10);
  try {
    const db = await getDb();
    const result = await db.getFirstAsync('SELECT * FROM usuarios WHERE id = ?;', [idNumber]);
    return result;
  }
  catch (error){
    console.log('Error al obtener usuario por ID:', error);
    return null;
  };
};

export const guardarImagenPerfil = async (id, rutaImagen) => {
  const idnumero = parseInt(id);
  try {
    const db = await getDb();
    await db.runAsync(
      'UPDATE usuarios SET fotoPerfil = ? WHERE id = ?;', 
      [rutaImagen, idnumero],
    )
    Alert.alert('Foto de perfil actualizada exitosamente');
    console.log('ruta guardada', rutaImagen)
  }
  catch (error) {
    console.log('Error al actualizar foto de perfil:', error);
    Alert.alert('Error al actualizar foto de perfil:', error.message);
    }
};

