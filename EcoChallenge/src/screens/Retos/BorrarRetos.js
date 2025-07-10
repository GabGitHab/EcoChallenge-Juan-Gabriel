import AsyncStorage from "@react-native-async-storage/async-storage"
import InputTexto from "../../components/InputTexto"
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text, StyleSheet } from "react-native";
import Boton from "../../components/Boton";
import { obtenerRetoPorId, eliminarRetoPorId } from "../../fetchers/fetchRetos";

const BorrarRetos = ({navigation}) => {

    const [nombreReto, setNombreReto] = useState("")

    const borrarReto = async () => {
        try {
            const reto = await obtenerRetoPorId(nombreReto);
            console.log('Reto encontrado para borrar:', reto);
            if (reto) {
                const resp = await eliminarRetoPorId(nombreReto); 
                Alert.alert("El Reto " + nombreReto + " se borro con exito!");
                setNombreReto("");
                navigation.goBack("MenuRetos");
            } else {
                Alert.alert("No se encontro el reto con el nombre " + nombreReto);
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el reto!");
        }
    }
    return (
        <SafeAreaView style={styles.fondo}>
            <View >
                <View >
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Buscar reto para eliminar"
                                onChangeText={setNombreReto}
                            />
                            <Boton titulo="Borrar Reto" evento={borrarReto} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default BorrarRetos;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})