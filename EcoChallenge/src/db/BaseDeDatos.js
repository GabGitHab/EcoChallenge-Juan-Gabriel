import * as SQLite from 'expo-sqlite';

// Variable para la base de datos
let db;

// Función para obtener o abrir la base de datos async
export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('eco_challenge.db');
  }
  return db;
};

// Función para activar claves foráneas async
const activarClavesForaneas = async () => {
  const db = await getDb();
  try {
    await db.transaction(async tx => {
      await tx.executeSqlAsync('PRAGMA foreign_keys = ON;');
    });
    console.log('Claves foráneas activadas');
  } catch (error) {
    console.log('Error activando claves foráneas', error);
  }
};

// Función para iniciar la base de datos y crear tablas
export const iniciarDatabase = async () => {
  const db = await getDb();

  await activarClavesForaneas();

  try {
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS Usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          edad INTEGER,
          barrio TEXT,
          fotoPerfil TEXT,
          puntajeTotal INTEGER DEFAULT 0
        );
      `);

      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS retos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT NOT NULL,
          descripcion TEXT,
          categoria TEXT,
          fechaLimite TEXT,
          puntajeAsign INTEGER
        );
      `);

      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS materiales_reciclables (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          categoria TEXT,
          imagen TEXT
        );
      `);

      await tx.executeSqlAsync(`
        CREATE TABLE IF NOT EXISTS participaciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_usuario INTEGER,
          id_reto INTEGER,
          foto TEXT,
          latitud REAL,
          longitud REAL,
          comentario TEXT,
          estadoDeRevision TEXT,
          FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
          FOREIGN KEY (id_reto) REFERENCES retos(id)
        );
      `);
    });

    console.log('Tablas creadas o ya existentes');
  } catch (error) {
    console.log('Error al crear las tablas:', error);
  }
};

export default db;
