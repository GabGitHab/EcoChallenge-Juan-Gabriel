import { getDb } from '../db/database';

export const agregarMaterial = async (material) => {
  const { nombre, categoria, imagen } = material;

  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO materiales_reciclables (nombre, categoria, imagen)
       VALUES (?, ?, ?);`,
      [nombre, categoria, imagen]
    );
    console.log('Material insertado');
  } catch (error) {
    console.log('Error al insertar material:', error);
  }
};

export const obtenerMateriales = async () => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      'SELECT * FROM materiales_reciclables;',
      []
    );
    return result;
  } catch (error) {
    console.log('Error al obtener materiales:', error);
    return [];
  }
};

export const obtenerMaterialPorId = async (id) => {
  try {
    const db = await getDb();
    const result = await db.getFirstAsync(
      'SELECT * FROM materiales_reciclables WHERE id = ?;',
      [id]
    );
    return result;
  } catch (error) {
    console.log('Error al obtener material por ID:', error);
    return null;
  }
};

export const eliminarMaterialPorId = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(
      'DELETE FROM materiales_reciclables WHERE id = ?;',
      [id]
    );
    console.log('Material eliminado');
  } catch (error) {
    console.log('Error al eliminar material:', error);
  }
};

export const modificarMaterial = async (materialMod) => {
  const { id, nombre, categoria, imagen } = materialMod;

  try {
    const db = await getDb();
    await db.runAsync(
      `UPDATE materiales_reciclables 
       SET nombre = ?, categoria = ?, imagen = ? 
       WHERE id = ?;`,
      [nombre, categoria, imagen, id]
    );
    console.log('Material modificado');
  } catch (error) {
    console.log('Error al modificar material:', error);
  }
};
