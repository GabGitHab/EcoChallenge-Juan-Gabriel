import AsyncStorage from '@react-native-async-storage/async-storage';

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
