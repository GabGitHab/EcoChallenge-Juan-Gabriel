import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('eco_challenge.db');

const activarClavesForaneas = () => {
    //SQL Lite requiere activar claves foraneas luego de crear la base de datos

  db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => {
    console.log('Claves foráneas activadas');
  });
};

export const iniciarDatabase = () => {
  activarClavesForaneas();
    // Crear las tablas si no existen
  db.transaction(tx => {
    tx.executeSql(`
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

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS retos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        categoria TEXT,
        fechaLimite TEXT,
        puntajeAsign INTEGER
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS materiales_reciclables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        categoria TEXT,
        imagen TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS participaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        id_reto INTEGER,
        foto TEXT,
        latitud REAL,
        longitud REAL,
        comentario TEXT,
        estadoDeRevision TEXT,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        FOREIGN KEY (id_reto) REFERENCES retos(id)
      );
    `);
  },
  (error) => {
    console.log('Error al crear las tablas:', error);
  },
  () => {
    console.log('Tablas creadas o ya existentes');
  });
};

export default db;
