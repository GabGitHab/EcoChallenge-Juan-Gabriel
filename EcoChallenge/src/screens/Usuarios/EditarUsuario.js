import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";

const EditarUsuario = () => {
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
    const [buscarNombreUsuario, setBuscarNombreUsuario] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [edadUsuario, setEdadUsuario] = useState("");
    const [barrioUsuario, setBarrioUsuario] = useState("");
    const [fotoPerfilUsuario, setFotoPerfilUsuario] = useState("");

    const buscarUsuario = async () => {
        if (!buscarNombreUsuario.trim()) {
            Alert.alert("El nombre de usuario es requerido!");
            return;
        }

        try {
            const usuario = await AsyncStorage.getItem(buscarNombreUsuario);
            if (usuario) {
                const datosUsuario = JSON.parse(usuario);
                setNombreUsuario(datosUsuario.nombre);
                setCorreoUsuario(datosUsuario.correoElectronico);
                setEdadUsuario(datosUsuario.edad);
                setBarrioUsuario(datosUsuario.barrio);
                setFotoPerfilUsuario(datosUsuario.fotoPerfil);
                setUsuarioEncontrado(true)
            } else {
                Alert.alert("Usuario no encontrado!");
                setNombreUsuario("");
                setCorreoUsuario("");
                setEdadUsuario("");
                setBarrioUsuario("");
                setFotoPerfilUsuario("");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error al buscar usuario.");
        }
    };

    const actualizarUsuario = async () => {
        if (!nombreUsuario.trim()) {
            Alert.alert("El nombre de usuario es requerido!");
            return;
        }
        if (!correoUsuario.trim()) {
            Alert.alert("El email es requerido!");
            return;
        }
        if (!edadUsuario.trim() || Number(edadUsuario) <= 0) {
            Alert.alert("La edad es requerida y debe ser mayor a 0");
            return;
        }
        if (!barrioUsuario.trim()) {
            Alert.alert("El barrio es requerido!");
            return;
        }
        if (!fotoPerfilUsuario.trim()) {
            Alert.alert("La foto de perfil es requerida!");
            return;
        }

        try {
            const usuario = {
                nombre: nombreUsuario,
                correoElectronico: correoUsuario,
                edad: edadUsuario,
                barrio: barrioUsuario,
                fotoPerfil: fotoPerfilUsuario
            };
            await AsyncStorage.setItem(buscarNombreUsuario, JSON.stringify(usuario));
            Alert.alert("Usuario actualizado con Exito!");
            setUsuarioEncontrado(false)
            setBuscarNombreUsuario("")
        } catch (error) {
            console.error(error);
            Alert.alert("Error al actualizar el usuario.");
        }
    };

    return (
        <SafeAreaView style={{ paddingTop: 100 }}>
            <View>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                        <InputTexto
                            placeholder="Ingrese el correo electronico para buscar usuario"
                            value={buscarNombreUsuario}
                            onChangeText={setBuscarNombreUsuario}
                        />
                        <Boton
                            titulo="Buscar" evento={buscarUsuario} />

                        {usuarioEncontrado && //si usuarioEncontrado es treu, muestra el formulario, sino no
                            <View>
                                <Text>Usuario Encontrado : {correoUsuario}</Text>

                                <InputTexto
                                    placeholder="Ingrese el nombre de Usuario"
                                    value={nombreUsuario}
                                    onChangeText={setNombreUsuario}
                                />
                                <InputTexto
                                    placeholder="Ingrese la edad"
                                    keyboardType="numeric"
                                    value={edadUsuario}
                                    onChangeText={setEdadUsuario}
                                />
                                <InputTexto
                                    placeholder="Ingrese el Barrio o zona residencial"
                                    value={barrioUsuario}
                                    onChangeText={setBarrioUsuario}
                                />
                                <InputTexto
                                    backgroundColor="Red"
                                    placeholder="Ingrese foto de Perfil"
                                    value={fotoPerfilUsuario}
                                    onChangeText={setFotoPerfilUsuario}
                                />
                                <Boton titulo="Actualizar" evento={actualizarUsuario} />
                            </View>
                        }
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



export default EditarUsuario;

