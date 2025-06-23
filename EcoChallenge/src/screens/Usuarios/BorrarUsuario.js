import AsyncStorage from "@react-native-async-storage/async-storage"
import InputTexto from "../../components/InputTexto"
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native";
import Boton from "../../components/Boton";


const BorrarUsuario = ({ navigation }) => {

    const [nombreUsuario, setNombreUsuario] = useState("")


    const borrarUsuario = async () => {

        try {
            const usuario = await AsyncStorage.getItem(nombreUsuario)

            if (usuario) {
                await AsyncStorage.removeItem(nombreUsuario)
                Alert.alert("El usuario " + nombreUsuario + " se borró con exito")
            } else {
                Alert.alert("No se encontro el usuario " + nombreUsuario);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el usuario!");
        }
    }
    return (
        <SafeAreaView style={{ paddingTop: 100 }}>
            <View >
                <View >
                    <ScrollView>

                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Buscar usuario para eliminar"
                                onChangeText={(text) => setNombreUsuario(text)}
                            />
                            <Boton titulo="Borrar usuario" evento={borrarUsuario} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BorrarUsuario;
