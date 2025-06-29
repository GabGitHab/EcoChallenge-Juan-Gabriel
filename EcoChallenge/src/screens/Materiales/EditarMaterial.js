import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            Alert.alert("Debe completar el campo con el nombre del material")
            return;
        }
        try {
            const material = await AsyncStorage.getItem(buscarNombreMaterial)
            if (material) {
                const datosMaterial = JSON.parse(material)
                setNombreMaterial(datosMaterial.nombre)
                setCategoriaMaterial(datosMaterial.categoria)
                setImagenMaterial(datosMaterial.imagen)
                setMaterialEncontrado(true)
            } else {
                setNombreMaterial("")
                setCategoriaMaterial("")
                setImagenMaterial("")
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar el material.");
        }
    }
    const actualizarMaterial = async () => {

        if (!nombreMaterial.trim()) {
            Alert.alert("El nombre del material es requerido")
        }
        if (!categoriaMaterial.trim()) {
            Alert.alert("La categoria del material es requerida")
        }
        if (!imagenMaterial) {
            Alert.alert("La imagen del material es requerida")
        }

        try {
            const material = {
                nombre: nombreMaterial,
                categoria: categoriaMaterial,
                imagen: imagenMaterial,
            };
            await AsyncStorage.setItem(buscarNombreMaterial, JSON.stringify(material))
            Alert.alert("El material se actualizo correctamente!")
            setMaterialEncontrado(false)
            setNombreMaterial("")
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el material.");
        }
    };
    return (
        <SafeAreaView style={styles.fondo}>
            <View >
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                        <InputTexto
                            placeholder="Ingrese el nombre del material para buscarlo"
                            value={buscarNombreMaterial}
                            onChangeText={setBuscarNombreMaterial}
                        />
                        <Boton
                            titulo="Buscar" evento={buscarMateria} />

                        {materialEncontrado && //si usuarioEncontrado es treu, muestra el formulario, sino no
                            <View>
                                <Text>Material Encontrado : {nombreMaterial}</Text>

                                <InputTexto
                                    placeholder="Ingrese el nombre del Material"
                                    value={nombreMaterial}
                                    onChangeText={setNombreMaterial}
                                />
                                <InputTexto
                                    placeholder="Ingrese la categoria del material"
                                    value={categoriaMaterial}
                                    onChangeText={setCategoriaMaterial}
                                />
                                <InputTexto
                                    placeholder="Ingrese la imagen del material"
                                    value={imagenMaterial}
                                    onChangeText={setImagenMaterial}
                                />
                                <Boton titulo="Actualizar" evento={actualizarMaterial} />
                            </View>
                        }
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
export default EditarMaterial;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})