import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistroUsuario from './src/screens/Usuarios/RegistroUsuario';
import Inicio from './src/screens/Inicio';
import RootStack from './src/routes/RootStack';


export default function App() {
  return (
    <RootStack />
  );
}


