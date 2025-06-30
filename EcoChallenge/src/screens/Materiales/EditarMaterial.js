import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";

const EditarMaterial = () => {
    const [materialEncontrado, setMaterialEncontrado] = useState(false);
    const [buscarNombreMaterial, setBuscarNombreMaterial] = useState("");
    const [nombreMaterial, setNombreMaterial] = useState("");
    const [categoriaMaterial, setCategoriaMaterial] = useState("");
    const [imagenMaterial, setImagenMaterial] = useState("");

    const buscarMateria = async () => {
        if (!buscarNombreMaterial.trim()) {
            Alert.alert("Debe completar el campo con el nombre del material");
            return;
        }
        try {
            const material = await AsyncStorage.getItem(buscarNombreMaterial);
            if (material) {
                const datosMaterial = JSON.parse(material);
                setNombreMaterial(datosMaterial.nombre);
                setCategoriaMaterial(datosMaterial.categoria);
                setImagenMaterial(datosMaterial.imagen);
                setMaterialEncontrado(true);
            } else {
                Alert.alert("No se encontró el material");
                setMaterialEncontrado(false);
                setNombreMaterial("");
                setCategoriaMaterial("");
                setImagenMaterial("");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar el material.");
        }
    };

    const actualizarMaterial = async () => {
        if (!nombreMaterial.trim()) {
            Alert.alert("El nombre del material es requerido");
            return;
        }
        if (!categoriaMaterial.trim()) {
            Alert.alert("La categoría del material es requerida");
            return;
        }
        if (!imagenMaterial) {
            Alert.alert("La imagen del material es requerida");
            return;
        }

        try {
            const material = {
                nombre: nombreMaterial,
                categoria: categoriaMaterial,
                imagen: imagenMaterial,
            };
            await AsyncStorage.setItem(buscarNombreMaterial, JSON.stringify(material));
            Alert.alert("El material se actualizó correctamente!");
            setMaterialEncontrado(false);
            setNombreMaterial("");
            setCategoriaMaterial("");
            setImagenMaterial("");
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el material.");
        }
    };

    const pedirPermisos = async () => {
        const cam = await ImagePicker.requestCameraPermissionsAsync();
        const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cam.granted || !gal.granted) {
            Alert.alert('Permisos requeridos', 'Habilita acceso a la cámara y la galería.');
            return false;
        }
        return true;
    };

    const seleccionarDeGaleria = async () => {
        if (!(await pedirPermisos())) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const fileName = asset.fileName || asset.uri.split('/').pop();
            const nuevaRuta = FileSystem.documentDirectory + fileName;

            try {
                await FileSystem.copyAsync({
                    from: asset.uri,
                    to: nuevaRuta,
                });
                setImagenMaterial(nuevaRuta);
            } catch (error) {
                console.error("Error al guardar la imagen:", error);
            }
        }
    };

    const tomarFoto = async () => {
        if (!(await pedirPermisos())) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const fileName = asset.fileName || asset.uri.split('/').pop();
            const nuevaRuta = FileSystem.documentDirectory + fileName;

            try {
                await FileSystem.moveAsync({
                    from: asset.uri,
                    to: nuevaRuta,
                });
                setImagenMaterial(nuevaRuta);
            } catch (error) {
                console.error("Error al guardar la imagen tomada:", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.fondo}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <InputTexto
                        placeholder="Ingrese el nombre del material"
                        value={buscarNombreMaterial}
                        onChangeText={setBuscarNombreMaterial}
                    />
                    <Boton
                        backgroundColor="#389fff"
                        titulo=" 🔍Buscar"
                        paddingVertical="20"
                        paddingHorizontal="10"
                        evento={buscarMateria} />

                    {materialEncontrado && (
                        <View>
                            <Text style={styles.titulo}>Material encontrado: {nombreMaterial}</Text>

                            <InputTexto
                                placeholder="Ingrese el nombre del material"
                                value={nombreMaterial}
                                onChangeText={setNombreMaterial}
                            />
                            <InputTexto
                                placeholder="Ingrese la categoría del material"
                                value={categoriaMaterial}
                                onChangeText={setCategoriaMaterial}
                            />

                            <View style={styles.imagenContainer}>
                                {imagenMaterial ? (
                                    <Image source={{ uri: imagenMaterial }} style={styles.imagenPreview} />
                                ) : (
                                    <Text style={styles.placeholder}>Ninguna imagen seleccionada</Text>
                                )}
                                <Boton titulo="Elegir de galería" evento={seleccionarDeGaleria} />
                                <View style={styles.espaciado} />
                                <Boton titulo="Tomar foto" evento={tomarFoto} />
                            </View>

                            <Boton
                                backgroundColor="#25d366"
                                titulo="Actualizar"
                                evento={actualizarMaterial} />
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditarMaterial;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    imagenContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    imagenPreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    placeholder: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 10,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40, // para que no lo tape el teclado
    },

    formulario: {
        flexGrow: 1,
        justifyContent: 'center',
    },

});
