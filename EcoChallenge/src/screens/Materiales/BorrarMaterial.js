import AsyncStorage from "@react-native-async-storage/async-storage"
import InputTexto from "../../components/InputTexto"
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, StyleSheet } from "react-native";
import Boton from "../../components/Boton";

const BorrarMaterial = ({navigation}) => {
    const [nombreMaterial, setNombreMaterial] = useState("")

    const borrarMaterial = async () => {
        try {
            const material = AsyncStorage.getItem(nombreMaterial)
            if (material) {
                await AsyncStorage.removeItem(nombreMaterial)
                Alert.alert("El material " + nombreMaterial + " se borro con Exito!")
                setNombreMaterial("")
            } else {
                Alert.alert("No se encontro el material con el nombre " + nombreMaterial)
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el material!");
        }
    }
    return (
        <SafeAreaView style={styles.fondo}>
            <View >
                <View >
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Buscar material para eliminar"
                                onChangeText={(text) => setNombreMaterial(text)}
                            />
                            <Boton titulo="Borrar Material" evento={borrarMaterial} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default BorrarMaterial;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})