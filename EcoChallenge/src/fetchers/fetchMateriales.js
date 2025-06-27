import db from '../db/database';

export const agregarMaterial = (material, callback) => {
  const { nombre, categoria, imagen } = material;

  db.transactionAsync(tx => {
    tx.executeSql(
      `INSERT INTO materiales_reciclables (nombre, categoria, imagen)
       VALUES (?, ?, ?);`,
      [nombre, categoria, imagen],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al insertar material:', error); return false; }
    );
  });
};

export const obtenerMateriales = (callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'SELECT * FROM materiales_reciclables;',
      [],
      (_, result) => callback?.(result.rows._array),
      (_, error) => { console.log('Error al obtener materiales:', error); return false; }
    );
  });
};

export const obtenerMaterialPorId = (id, callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'SELECT * FROM materiales_reciclables WHERE id = ?;',
      [id],
      (_, result) => callback?.(result.rows._array[0]),
      (_, error) => { console.log('Error al obtener material por ID:', error); return false; }
    );
  });
};


export const eliminarMaterialPorId = (id, callback) => {
  db.transactionAsync(tx => {
    tx.executeSql(
      'DELETE FROM materiales_reciclables WHERE id = ?;',
      [id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al eliminar material:', error); return false; }
    );
  });
};

export const modificarMaterial = (materialMod, callback) => {
  const { nombre, categoria, imagen } = materialMod;

  db.transactionAsync(tx => {
    tx.executeSql(
      `UPDATE materiales_reciclables 
       SET nombre = ?, categoria = ?, imagen = ? 
       WHERE id = ?;`,
      [nombre, categoria, imagen, id],
      (_, result) => callback?.(result),
      (_, error) => { console.log('Error al modificar material:', error); return false; }
    );
  });
};