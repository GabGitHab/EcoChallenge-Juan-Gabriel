import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('eco_challenge2.db');
  }
  return dbInstance;
};

export const iniciarDatabase = async () => {
  try {
    const db = await getDb();

    await db.runAsync('PRAGMA foreign_keys = ON;');

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        contraseña TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        edad INTEGER,
        barrio TEXT,
        fotoPerfil TEXT,
        puntajeTotal INTEGER DEFAULT 0
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS retos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        categoria TEXT,
        fechaLimite TEXT,
        puntajeAsign INTEGER
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS materiales_reciclables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        categoria TEXT,
        imagen TEXT
      );
    `);

    await db.runAsync(`
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

    console.log('Tablas creadas o ya existentes');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  }
};
