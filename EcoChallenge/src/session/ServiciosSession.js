import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from "../components/context/contextoUsuario";


let usuario; // Declaralo arriba

(async () => {
  usuario = await obtenerSesion(); 
})();

export const guardarSesion = async (usuario) => {
  const usuarioJson = JSON.stringify(usuario);
  await AsyncStorage.setItem('usuarioSesion', usuarioJson);
  console.log('Sesión guardada');
};

export const obtenerSesion = async () => {
  const { usuario, setUsuario } = useUser();

  if (usuario !== null) {
    console.log('Sesión obtenida');
    return usuario;
  } else {
    console.log('No hay sesión guardada');
    return null;
  }
};

export const logOut = async () => {
  const { setUsuario } = useUser();
  setUsuario(null);
  await AsyncStorage.removeItem('usuarioSesion');
  console.log('Sesión cerrada');
};
