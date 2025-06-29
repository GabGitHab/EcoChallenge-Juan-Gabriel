import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { useState } from "react"
import InputTexto from "../../components/InputTexto"
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet } from "react-native";
import Boton from "../../components/Boton";

const RegistroRetos = ({ navigation }) => {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [categoria, setCategoria] = useState("")
    const [fechaLimite, setFechaLimite] = useState("")
    const [puntajeAsignado, setPuntajeAsignado] = useState("")


    const LimpiarDatos = () => {
        setNombre("")
        setDescripcion("")
        setCategoria("")
        setFechaLimite("")
        setPuntajeAsignado("")
    }

    const registrarReto = async () => {
        if (!nombre.trim()) {
            Alert.alert("Debe completar el campo con el nombre del reto")
        }
        if (!descripcion.trim()) {
            Alert.alert("Debe completar el campo con una descripcion del reto")
        }
        if (!categoria.trim()) {
            Alert.alert("Debe Colocar a que categoria pertenece el reto")
        }
        if (!fechaLimite.trim()) {
            Alert.alert("Debe especificar la fecha limite del reto")
        }
        if (!puntajeAsignado.trim() || parseInt(puntajeAsignado) < 0) {
            Alert.alert("El puntaje no puede estar vacio ni ser menor que 0")
        }
        try {
            const reto = {
                nombre,
                descripcion,
                categoria,
                fechaLimite,
                puntajeAsignado
            }
            await AsyncStorage.setItem(nombre, JSON.stringify(reto));
            LimpiarDatos();
            Alert.alert("Su reto se creo correctamente")
        }
        catch (error) {
            console.error(error);
            Alert.alert("Error al registrar el reto.")
        }
    }
    return (
        <SafeAreaView style={styles.fondo}>
            <View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Nombre del Reto"
                                onChangeText={setNombre}
                                value={nombre} />
                            <InputTexto
                                placeholder="Descripcion del reto"
                                onChangeText={setDescripcion}
                                value={descripcion} />
                            <InputTexto
                                placeholder="Categoria"
                                onChangeText={setCategoria}
                                value={categoria} />
                            <InputTexto
                                placeholder="Fecha Limite"
                                onChangeText={setFechaLimite}
                                value={fechaLimite} />
                            <InputTexto
                                placeholder="Puntaje Asignado"
                                keyboardType="numeric"
                                onChangeText={setPuntajeAsignado}
                                value={puntajeAsignado} />
                            <Boton
                                backgroundColor="green"
                                titulo="Guardar Reto"
                                evento={registrarReto}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegistroRetos;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})