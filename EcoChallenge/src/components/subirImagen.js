import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { guardarImagenPerfil } from '../fetchers/fetchUsuarios'
import { useState } from 'react'
import { guardarImagenPerfil } from '../fetchers/fetchUsuarios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import Boton from './Boton'
import { obtenerSesion } from '../session/ServiciosSession'

const subirImagen = ( {navigation} ) => {

    const [image, setImage] = useState(null);
    const [usuario, setUsuario] = useState(null);
    
    useEffect(() => {
        obtenerUsuario();
    }, []);


    const obtenerUsuario = async () => {
        let usuarioSesion;
        usuarioSesion = await obtenerSesion();
        setUsuario(usuario);
        return usuarioSesion
    };

    const pedirPermisos = async () => {
        const cam = await ImagePicker.requestCameraPermissionsAsync();
        const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cam.granted || !gal.granted) {
            Alert.alert('Permisos requeridos',
                    'Habilita acceso a la camara y la galeria.');
        return false;
        }
        return true;
    }

    const pickFromGallery = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        });
        if (!result.canceled) setImage(result);
    };

    const takePhoto = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        });
        if (!result.canceled) setImage(result);
    };

    const guardarImagenEnDispo = async (resultado) => {
        if (usuario == null){
            Alert.alert("Debes iniciar sesion para esto");
            navigation.navigate("Inicio");
        }

        if(imagen == null)
        {
            Alert.alert("Debes subir una foto primero");
            return
        };
        const asset = resultado.assets[0];
        const nombreArchivo = asset.fileName || asset.uri.split('/').pop();
        const nuevaRuta = FileSystem.documentDirectory + fileName;

        try {
           await FileSystem.moveAsync({
                from: asset.uri,
                to: nuevaRuta
            });
            setRutaGuardada(nuevaRuta)

        } catch (error) {
            console.error('Error al mover o guardar imagen:', error);
        }

        await guardarImagenPerfil(nuevaRuta, usuario.id);
        navigation.navigate("ListadoUsuarios")
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subi­ tu imagen</Text>

            <View style={styles.preview}>
                {image
                ? <Image source={{ uri: image }} style={styles.image}/>
                : <Text style={styles.placeholder}>Ninguna imagen seleccionada</Text>}
            </View>

            <Boton titulo="Elegir de galeria" evento={pickFromGallery}/>
            <View style={styles.gap}/>
            <Boton titulo="Tomar foto" evento={takePhoto}/>
            <Boton titulo = "Guardar como foto de perfil" evento={guardarImagenEnDispo(image)} />
        </View>
    );
}

export default subirImagen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center',
               backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16,
           textAlign: 'center' },
  preview: { height: 250, borderRadius: 12, backgroundColor: '#e0e0e0',
             alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  image: { width: '100%', height: '100%', borderRadius: 12 },
  placeholder: { color: '#777' },
  gap: { height: 10 },
});