import db from '../db/database';

export const agregarParticipacion = (p, callback) => {
  const { id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision } = p;

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO participaciones 
       (id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision)
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al insertar participación:', error); return false; }
    );
  });
};

export const obtenerParticipaciones = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM participaciones;',
      [],
      (_, result) => callback?.(result.rows._array),
      (_, error) => { console.log('Error al obtener participaciones:', error); return false; }
    );
  });
};

export const obtenerParticipacionPorId = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM participaciones WHERE id = ?;',
      [id],
      (_, result) => callback?.(result.rows._array[0]),
      (_, error) => { console.log('Error al obtener participación por ID:', error); return false; }
    );
  });
};

export const eliminarParticipacionPorId = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM participaciones WHERE id = ?;',
      [id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al eliminar participación:', error); return false; }
    );
  });
};

export const modificarParticipacion = (participacionModificada, callback) => {
  const { id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision } = participacionModificada;

  db.transaction(tx => {
    tx.executeSql(
      `UPDATE participaciones 
       SET id_usuario = ?, id_reto = ?, foto = ?, latitud = ?, longitud = ?, comentario = ?, estadoDeRevision = ? 
       WHERE id = ?;`,
      [id_usuario, id_reto, foto, latitud, longitud, comentario, estadoDeRevision, id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al modificar participación:', error); return false; }
    );
  });
};

export const obtenerParticipacionesPorUsuario = (id_usuario, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM participaciones WHERE id_usuario = ?;',
      [id_usuario],
      (_, result) => callback?.(result.rows._array),
      (_, error) => { console.log('Error al obtener participaciones por usuario:', error); return false; }
    );
  });
}
