import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistroUsuario from './src/screens/Usuarios/RegistroUsuario';
import Inicio from './src/screens/Inicio';
import RootStack from './src/routes/RootStack';
import { iniciarDatabase } from './src/db/BaseDeDatos';
import { useEffect } from 'react';
import { logOut } from './src/session/ServiciosSession';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ProviderUsuario } from './src/components/context/contextoUsuario';



export default function App() {
  useEffect(() => {
    const iniciar = async () => {
      await iniciarDatabase();
      logOut();       // Cerramos la sesion anterior si existe
    }
    iniciar();
  }, []);

  return (
    <ProviderUsuario>
      <PaperProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </ProviderUsuario>
  );
}


