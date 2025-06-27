import db from '../db/database';

export const agregarReto = (reto, callback) => {
  const { titulo, descripcion, categoria, fechaLimite, puntajeAsign } = reto;

  db.transactionAsync(tx => {
    tx.executeSql(
      `INSERT INTO retos (titulo, descripcion, categoria, fechaLimite, puntajeAsign) 
       VALUES (?, ?, ?, ?, ?);`,
      [titulo, descripcion, categoria, fechaLimite, puntajeAsign],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al insertar reto:', error); return false; }
    );
  });
};

export const obtenerRetos = (callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'SELECT * FROM retos;',
      [],
      (_, result) => callback?.(result.rows._array),
      (_, error) => { console.log('Error al obtener retos:', error); return false; }
    );
  });
};

export const obtenerRetoPorId = (id, callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'SELECT * FROM retos WHERE id = ?;',
      [id],
      (_, result) => callback?.(result.rows._array[0]),
      (_, error) => { console.log('Error al obtener reto por ID:', error); return false; }
    );
  });
};  

export const eliminarRetoPorId = (id, callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'DELETE FROM retos WHERE id = ?;',
      [id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al eliminar reto:', error); return false; }
    );
  });
};

export const modificarReto = (retoModificado, callback) => {
  const { titulo, descripcion, categoria, fechaLimite, puntajeAsign } = retoModificado;

  db.transactionAsync(tx => {
    tx.executeSql(
      `UPDATE retos 
       SET titulo = ?, descripcion = ?, categoria = ?, fechaLimite = ?, puntajeAsign = ? 
       WHERE id = ?;`,
      [titulo, descripcion, categoria, fechaLimite, puntajeAsign, id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al modificar reto:', error); return false; }
    );
  });
};