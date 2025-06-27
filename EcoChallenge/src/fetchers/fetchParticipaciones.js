import db from '../db/database';

export const agregarParticipacion = async (p) => {
  const { id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision } = p;

  try {
    await db.runAsync(
      `INSERT INTO participaciones 
       (id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision]
    );
    console.log('Participación agregada');
  } catch (error) {
    console.log('Error al insertar participación:', error);
  }
};

export const obtenerParticipaciones = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM participaciones;');
    return result;
  } catch (error) {
    console.log('Error al obtener participaciones:', error);
    return [];
  }
};

export const obtenerParticipacionPorId = async (id) => {
  try {
    const result = await db.getFirstAsync('SELECT * FROM participaciones WHERE id = ?;', [id]);
    return result;
  } catch (error) {
    console.log('Error al obtener participación por ID:', error);
    return null;
  }
};

export const eliminarParticipacionPorId = async (id) => {
  try {
    await db.runAsync('DELETE FROM participaciones WHERE id = ?;', [id]);
    console.log('Participación eliminada');
  } catch (error) {
    console.log('Error al eliminar participación:', error);
  }
};

export const modificarParticipacion = async (participacionModificada) => {
  const { id, id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision } = participacionModificada;

  try {
    await db.runAsync(
      `UPDATE participaciones 
       SET id_usuario = ?, id_reto = ?, foto = ?, latitud = ?, longitud = ?, comentario = ?, estadoDeRevision = ? 
       WHERE id = ?;`,
      [id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision, id]
    );
    console.log('Participación modificada');
  } catch (error) {
    console.log('Error al modificar participación:', error);
  }
};

export const obtenerParticipacionesPorUsuario = async (id_usuario) => {
  try {
    const result = await db.getAllAsync(
      'SELECT * FROM participaciones WHERE id_usuario = ?;',
      [id_usuario]
    );
    return result;
  } catch (error) {
    console.log('Error al obtener participaciones por usuario:', error);
    return [];
  }
};
