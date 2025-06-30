import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import InputTexto from "../../components/InputTexto"
import Boton from "../../components/Boton"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

const RegistroMaterial = () => {

    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [imagen, setImagen] = useState(null) // URI de la imagen
    const [rutaGuardada, setRutaGuardada] = useState(null)

    const pedirPermisos = async () => {
        const cam = await ImagePicker.requestCameraPermissionsAsync();
        const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cam.granted || !gal.granted) {
            Alert.alert('Permisos requeridos', 'Habilita acceso a la cámara y la galería.');
            return false;
        }
        return true;
    }

    const pickFromGallery = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImagen(uri);
        }
    }

    const takePhoto = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImagen(uri);
        }
    }

    const LimpiarDatos = () => {
        setNombre("")
        setCategoria("")
        setImagen(null)
        setRutaGuardada(null)
    }

    const registrarMaterial = async () => {
        if (!nombre.trim()) {
            Alert.alert("El campo nombre no puede estar vacío")
            return;
        }
        if (!categoria.trim()) {
            Alert.alert("El campo categoría no puede estar vacío")
            return;
        }
        if (!imagen) {
            Alert.alert("Debe subir una imagen")
            return;
        }

        try {
            // Mover la imagen a una ruta persistente
            const nombreArchivo = imagen.split('/').pop();
            const nuevaRuta = FileSystem.documentDirectory + nombreArchivo;

            await FileSystem.copyAsync({
                from: imagen,
                to: nuevaRuta
            });

            const material = {
                nombre,
                categoria,
                imagen: nuevaRuta
            }

            await AsyncStorage.setItem(nombre, JSON.stringify(material))
            LimpiarDatos();
            Alert.alert("El material se creó exitosamente!")
        } catch (error) {
            console.error(error);
            Alert.alert("Error al registrar el material.")
        }
    }

    return (
        <SafeAreaView style={styles.fondo}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <InputTexto
                        placeholder="Nombre del material"
                        onChangeText={setNombre}
                        value={nombre}
                    />
                    <InputTexto
                        placeholder="Categoría del material"
                        onChangeText={setCategoria}
                        value={categoria}
                    />

                    <Text style={{ margin: 10 }}>Imagen seleccionada:</Text>
                    <View style={styles.preview}>
                        {imagen
                            ? <Image source={{ uri: imagen }} style={styles.image} />
                            : <Text style={styles.placeholder}>Ninguna imagen seleccionada</Text>}
                    </View>

                    <Boton titulo="Elegir de galería" evento={pickFromGallery} />
                    <View style={styles.gap} />
                    <Boton titulo="Tomar foto" evento={takePhoto} />
                    <View style={styles.gap} />
                    <Boton backgroundColor="#25d366" titulo="💾 Guardar material" evento={registrarMaterial} />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegistroMaterial;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
        paddingHorizontal: 16
    },
    preview: {
        height: 200,
        borderRadius: 12,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },
    placeholder: {
        color: '#777'
    },
    gap: {
        height: 10
    }
});
