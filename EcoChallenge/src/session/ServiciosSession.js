import AsyncStorage from '@react-native-async-storage/async-storage';

// No podés usar `await` en el nivel superior si no estás en un `async function`
let usuario; // Declaralo arriba
(async () => {
  usuario = await obtenerSesion(); // ejecutalo dentro de una IIFE (función autoejecutable)
})();

export const guardarSesion = async (usuario) => {
  const usuarioJson = JSON.stringify(usuario);
  await AsyncStorage.setItem('usuarioSesion', usuarioJson);
  console.log('Sesión guardada');
};

export const obtenerSesion = async () => {
  const usuarioJson = await AsyncStorage.getItem('usuarioSesion');

  if (usuarioJson) {
    const usuario = JSON.parse(usuarioJson); // CORREGIDO: .JSON() NO EXISTE
    console.log('Sesión obtenida');
    return usuario;
  } else {
    console.log('No hay sesión guardada');
    return null;
  }
};

export const logOut = async () => {
  await AsyncStorage.removeItem('usuarioSesion');
  console.log('Sesión cerrada');
};
