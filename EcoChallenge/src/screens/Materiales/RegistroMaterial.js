import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { useState } from "react"
import InputTexto from "../../components/InputTexto"
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet } from "react-native";
import Boton from "../../components/Boton";

const RegistroMaterial = (navegacion) => {

    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [imagen, setImagen] = useState("")

    const LimpiarDatos = () => {
        setNombre("")
        setCategoria("")
        setImagen("")
    }

    const registrarMaterial = async () => {
        if (!nombre.trim()) {
            Alert.alert("El campo nombre no puede estar vacio")
        }
        if (!categoria.trim()) {
            Alert.alert("El campo categoria no puede estar vacio")
        }
        if (!imagen) {
            Alert.alert("La imagen no puede estar vacia")
        }

        try {
            const material = {
                nombre,
                categoria,
                imagen
            }
            await AsyncStorage.setItem(nombre, JSON.stringify(material))
            LimpiarDatos();
            Alert.alert("El material se creo exitosamente!")
        } catch (error) {
            console.error(error);
            Alert.alert("Error al registrar el material.")
        }
    }
    return (
        <SafeAreaView style={styles.fondo}>
            <View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Nombre del material"
                                onChangeText={setNombre}
                                value={nombre} />
                            <InputTexto
                                placeholder="Categoria del material"
                                onChangeText={setCategoria}
                                value={categoria} />
                            <InputTexto
                                placeholder="Imagen del material"
                                onChangeText={setImagen}
                                value={imagen} />
                            <Boton
                                backgroundColor="green"
                                titulo="Guardar material"
                                evento={registrarMaterial}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegistroMaterial;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})
