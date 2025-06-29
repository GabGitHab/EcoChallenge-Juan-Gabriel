import AsyncStorage from "@react-native-async-storage/async-storage"
import InputTexto from "../../components/InputTexto"
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native";
import Boton from "../../components/Boton";

const BorrarRetos = ({navigation}) => {

    const [nombreReto, setNombreReto] = useState("")

    const borrarReto = async () => {
        try {
            const reto = AsyncStorage.getItem(nombreReto)
            if (reto) {
                await AsyncStorage.removeItem(nombreReto)
                Alert.alert("El Reto " + nombreReto + " se borro con exito!")
                setNombreReto("")
            } else {
                Alert.alert("No se encontro el reto con el nombre " + nombreReto)
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al eliminar el reto!");
        }
    }
    return (
        <SafeAreaView style={{ paddingTop: 100 }}>
            <View >
                <View >
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Buscar reto para eliminar"
                                onChangeText={(text) => setNombreReto(text)}
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