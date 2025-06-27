import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistroUsuario from './src/screens/Usuarios/RegistroUsuario';
import Inicio from './src/screens/Inicio';
import RootStack from './src/routes/RootStack';
import { iniciarDatabase } from './src/db/BaseDeDatos';
import { useEffect } from 'react';
import { logOut } from './src/session/ServiciosSession';
import * as SQLite from 'expo-sqlite';


export default function App() {
  useEffect(() => {
      iniciarDatabase();
      logOut(); // Cerramos la sesion anterior si existe
  }, []);
  
  return (
    <RootStack />
  );
}


