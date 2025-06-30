import React, { useState } from "react";
import { Alert, SafeAreaView, View, ScrollView, KeyboardAvoidingView, Text, StyleSheet } from "react-native";
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const EditarRetos = () => {
    const [retoEncontrado, setRetoEncontrado] = useState(false);
    const [buscarRetoNombre, setBuscarRetoNombre] = useState("");
    const [nombreReto, setNombreReto] = useState("");
    const [descripcionReto, setDescripcionReto] = useState("");
    const [categoriaReto, setCategoriaReto] = useState("");
    const [fechaLimiteReto, setFechaLimiteReto] = useState("");
    const [puntajeAsignadoReto, setPuntajeAsignadoReto] = useState("");

    const buscarReto = async () => {
        if (!buscarRetoNombre.trim()) {
            Alert.alert("El nombre del reto es requerido.");
            return;
        }

        try {
            const retoGuardado = await AsyncStorage.getItem(buscarRetoNombre);
            if (retoGuardado) {
                const datosReto = JSON.parse(retoGuardado);
                setNombreReto(datosReto.nombre);
                setDescripcionReto(datosReto.descripcion);
                setCategoriaReto(datosReto.categoria);
                setFechaLimiteReto(datosReto.fechaLimite);
                setPuntajeAsignadoReto(datosReto.puntajeAsignado);
                setRetoEncontrado(true);
            } else {
                Alert.alert("No se encontró un reto con ese nombre.");
                setRetoEncontrado(false);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar el reto.");
        }
    };

    const actualizarReto = async () => {
        if (!nombreReto.trim()) {
            Alert.alert("El nombre del reto es requerido!");
            return;
        }
        if (!descripcionReto.trim()) {
            Alert.alert("La descripción del reto es requerida.");
            return;
        }
        if (!categoriaReto.trim()) {
            Alert.alert("La categoría del reto es requerida.");
            return;
        }
        if (!fechaLimiteReto.trim()) {
            Alert.alert("La fecha límite del reto es requerida.");
            return;
        }
        if (!puntajeAsignadoReto.trim() || parseInt(puntajeAsignadoReto) < 0) {
            Alert.alert("El puntaje es requerido y debe ser mayor o igual a 0.");
            return;
        }

        try {
            const reto = {
                nombre: nombreReto,
                descripcion: descripcionReto,
                categoria: categoriaReto,
                fechaLimite: fechaLimiteReto,
                puntajeAsignado: parseInt(puntajeAsignadoReto)
            };

            await AsyncStorage.setItem(buscarRetoNombre, JSON.stringify(reto));
            Alert.alert("El reto se actualizó con éxito.");
            setRetoEncontrado(false);
            setBuscarRetoNombre("");
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el reto.");
        }
    };

    return (
        <SafeAreaView style={styles.fondo}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
                    <InputTexto
                        placeholder="Nombre del reto para buscarlo"
                        value={buscarRetoNombre}
                        onChangeText={setBuscarRetoNombre}
                    />
                    <Boton
                        backgroundColor="#389fff"
                        titulo=" 🔍Buscar"
                        paddingVertical="20"
                        paddingHorizontal="10"
                        evento={buscarReto} />

                    {retoEncontrado && (
                        <View style={{ marginTop: 20 }}>
                            <Text>Reto encontrado: {nombreReto}</Text>

                            <InputTexto
                                placeholder="Ingrese el nombre del reto"
                                value={nombreReto}
                                onChangeText={setNombreReto}
                            />
                            <InputTexto
                                placeholder="Ingrese la descripción del reto"
                                value={descripcionReto}
                                onChangeText={setDescripcionReto}
                            />
                            <InputTexto
                                placeholder="Ingrese la categoría del reto"
                                value={categoriaReto}
                                onChangeText={setCategoriaReto}
                            />
                            <InputTexto
                                placeholder="Ingrese la fecha límite de participación"
                                value={fechaLimiteReto}
                                onChangeText={setFechaLimiteReto}
                            />
                            <InputTexto
                                placeholder="Ingrese el puntaje asignado"
                                value={puntajeAsignadoReto}
                                keyboardType="numeric"
                                onChangeText={setPuntajeAsignadoReto}
                            />
                            <Boton
                                backgroundColor="#25d366"
                                titulo="Actualizar"
                                evento={actualizarReto}
                                style={{ marginTop: 20 }}
                            />
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default EditarRetos;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    }
})