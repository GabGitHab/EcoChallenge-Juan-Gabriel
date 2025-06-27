import { useState } from "react";
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";

//Creamos los estados del registro
const RegistroUsuario = ({ navegacion }) => {
    const [nombre, setNombre] = useState("")
    const [correoElectronico, setCorreoElectronico] = useState("")
    const [edad, setEdad] = useState("")
    const [barrio, setBarrio] = useState("")
    const [fotoPerfil, setFotoPerfil] = useState("")

    //Funcion para volver a los estados 
    function LimpiarDatos() {
        setNombre("")
        setCorreoElectronico("")
        setEdad("")
        setBarrio("")
        // setFotoPerfil("")

    }

    //Cargamos en una constante, la foto de perfil por default para usar si el usuario no sube una foto de perfil
    // const fotoPerfilPredefinida = Image.resolveAssetSource(require("../assets/FotoPerfilPredeterminada.png")).uri

    // Funcion para registrar el usuario en la "base de datos"
    const registrarUsuario = async () => {
        //Avisamos al usuario que debe completar los campos si o si
        if (!nombre.trim()) {
            Alert.alert("Debe completar el campo con su Nombre completo");
            return;
        };
        if (!correoElectronico.trim() || correoElectronico.indexOf("@") === -1) {
            Alert.alert("Debe ingresar un correo electronico");
            return;
        };
        if (!edad.trim() || parseInt(edad) < 1) {
            Alert.alert("Debe completar el campo con su Edad");
            return;
        };
        if (!barrio.trim()) {
            Alert.alert("Debe completar el campo con ell nombre de su Barrio o Zona")
        };

        try {

            const usuario = { //Creamos el objeto Usuario
                nombre,
                correoElectronico,
                edad,
                barrio,
                fotoPerfil: fotoPerfil || fotoPerfilPredefinida
            } // Si el usuario no sube foto de perfil, asignamos la predeterminada que tenemos guardada

            await AsyncStorage.setItem(correoElectronico, JSON.stringify(usuario)); // Lo Guardamos en el AsyncStorage con la key correoElectronico
            LimpiarDatos(); // Llamamos a la funcion para que vacie los campos una vez guardados
            Alert.alert("Su usuario se registro con exito!") // Avisamos al usuario que se registro correctamente
        }
        catch (error) {
            console.error(error);
            Alert.alert("Error al registrar usuario.")
        }
    }
    return (
        <SafeAreaView style={{ paddingTop: 80 }} >
            <View >
                <View >
                    <ScrollView>
                        <KeyboardAvoidingView >
                            <InputTexto
                                placeholder="Nombre de Usuario"
                                onChangeText={setNombre}
                                value={nombre}
                            />
                            <InputTexto
                                placeholder="Correo Electronico"
                                keyboardType="email-address"
                                onChangeText={setCorreoElectronico}
                                value={correoElectronico}
                            />
                            <InputTexto
                                placeholder="Edad"
                                keyboardType="numeric"
                                onChangeText={setEdad}
                                value={edad}
                            />
                            <InputTexto
                                placeholder="Barrio o Zona de Residencia"
                                onChangeText={setBarrio}
                                value={barrio}
                            />
                            <InputTexto
                                placeholder="Foto de Perfil"
                                onChangeText={setFotoPerfil}
                                value={fotoPerfil}
                            />
                            <Boton
                                color="blue"
                                titulo="Guardar Usuario"
                                evento={registrarUsuario}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>)
};

export default RegistroUsuario;

