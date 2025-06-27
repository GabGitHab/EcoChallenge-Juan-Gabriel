import db from '../db/database';

export const agregarReto = async (reto) => {
  const { titulo, descripcion, categoria, fechaLimite, puntajeAsign } = reto;

  try {
    await db.runAsync(
      `INSERT INTO retos (titulo, descripcion, categoria, fechaLimite, puntajeAsign) 
       VALUES (?, ?, ?, ?, ?);`,
      [titulo, descripcion, categoria, fechaLimite, puntajeAsign]
    );
    console.log('Reto agregado');
  } catch (error) {
    console.log('Error al insertar reto:', error);
  }
};

export const obtenerRetos = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM retos;');
    return result;
  } catch (error) {
    console.log('Error al obtener retos:', error);
    return [];
  }
};

export const obtenerRetoPorId = async (id) => {
  try {
    const result = await db.getFirstAsync('SELECT * FROM retos WHERE id = ?;', [id]);
    return result;
  } catch (error) {
    console.log('Error al obtener reto por ID:', error);
    return null;
  }
};

export const eliminarRetoPorId = async (id) => {
  try {
    await db.runAsync('DELETE FROM retos WHERE id = ?;', [id]);
    console.log('Reto eliminado');
  } catch (error) {
    console.log('Error al eliminar reto:', error);
  }
};

export const modificarReto = async (retoModificado) => {
  const { id, titulo, descripcion, categoria, fechaLimite, puntajeAsign } = retoModificado;

  try {
    await db.runAsync(
      `UPDATE retos 
       SET titulo = ?, descripcion = ?, categoria = ?, fechaLimite = ?, puntajeAsign = ? 
       WHERE id = ?;`,
      [titulo, descripcion, categoria, fechaLimite, puntajeAsign, id]
    );
    console.log('Reto modificado');
  } catch (error) {
    console.log('Error al modificar reto:', error);
  }
};
