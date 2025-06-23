import AsyncStorage from '@react-native-async-storage/async-storage';

const usuario = obtenerSesion() ;

export const guardarSesion = async (usuario) => {
    const usuarioJson = JSON.stringify(usuario);
    await AsyncStorage.setItem('usuarioSesion', usuarioJson);
    console.log('Sesión guardada');
    return;
}

export const obtenerSesion = async () => {
    const usuario = await AsyncStorage.getItem('usuarioSesion');
    usuario = usuario.JSON();
    if (usuario) {
        console.log('Sesión obtenida');
        return usuario;
    } else {
        console.log('No hay sesión guardada');
        return null;
    }
} 

export const logOut = async () => {
    await AsyncStorage.removeItem('usuarioSesion');
    console.log('Sesión cerrada');
    return;
}