import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistroUsuario from './src/screens/Usuarios/RegistroUsuario';
import Inicio from './src/screens/Inicio';
import RootStack from './src/routes/RootStack';
import { iniciarDatabase } from './src/db/BaseDeDatos';
import { useEffect } from 'react';
import usuario from './src/session/ServiciosSession';
import logOut from './src/session/ServiciosSession';

export default function App() {
  useEffect(() => {
      iniciarDatabase();
      logOut(); // Cerramos la sesion anterior si existe
  }, []);
  
  return (
    <RootStack />
  );
}


