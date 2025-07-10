import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { useState } from "react"
import InputTexto from "../../components/InputTexto"
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Boton from "../../components/Boton";
import { agregarReto } from "../../fetchers/fetchRetos";

const RegistroRetos = ({ navigation }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");
    const [puntajeAsign, setPuntajeAsignado] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState(null);


    const LimpiarDatos = () => {
        setTitulo("")
        setDescripcion("")
        setCategoria("")
        setFechaLimite("")
        setPuntajeAsignado("")
    }

    const registrarReto = async () => {
        if (!titulo.trim()) {
            Alert.alert("Debe completar el campo con el nombre del reto");
            return;
        };
        if (!descripcion.trim()) {
            Alert.alert("Debe completar el campo con una descripcion del reto");
            return;
        };
        if (!categoria.trim()) {
            Alert.alert("Debe Colocar a que categoria pertenece el reto");
            return;
        };
        if (!fechaLimite.trim()) {
            Alert.alert("Debe especificar la fecha limite del reto");
            return;
        };
        if (!puntajeAsign.trim() || parseInt(puntajeAsign) < 0) {
            Alert.alert("El puntaje no puede estar vacio ni ser menor que 0");
            return;
        };
        
        try {
            setLoading(true);
            const reto = {
                titulo,
                descripcion,
                categoria,
                fechaLimite,
                puntajeAsign
            };
            console.log('Reto a registrar:', reto);
            const resp = await agregarReto(reto);
            if (resp) {
                Alert.alert("Su reto se creo correctamente","",[
                    {
                        text: "Aceptar",
                        onPress: () => navigation.navigate('MenuRetos'),
                    }
                ]);
                LimpiarDatos();
            }
        }
        catch (error) {
            console.error(error);
            setError(error);
            Alert.alert("Error al registrar el reto.");
        }
        finally {
            setLoading(false);
        };
    }

    return (
        <SafeAreaView style={styles.fondo}>
            <View>
                <View>
                    <ScrollView>
                        <Text style={{ color: "red" }}>{error}</Text>
                        <KeyboardAvoidingView>
                            <InputTexto
                                placeholder="Nombre del Reto"
                                onChangeText={setTitulo}
                                value={titulo} />
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
                                value={fechaLimite}
                                keyboardType="" />
                            <InputTexto
                                placeholder="Puntaje Asignado"
                                keyboardType="numeric"
                                onChangeText={setPuntajeAsignado}
                                value={puntajeAsign} />
                            <Boton
                                backgroundColor="green"
                                titulo={loading ? "guardando" : "Guardar Reto"}
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