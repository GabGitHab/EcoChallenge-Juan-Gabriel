import { useState } from "react";
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";
import { agregarUsuario } from "../../fetchers/fetchUsuarios";

//Creamos los estados del registro
const RegistroUsuario = ({ navigation, datosUsuario }) => {
    const [nombre, setNombre] = useState(datosUsuario.nombre ?? "")
    const [email, setEmail] = useState(datosUsuario.email ?? "")
    const [edad, setEdad] = useState(datosUsuario.edad ?? "")
    const [barrio, setBarrio] = useState(datosUsuario.barrio ?? "")
    const [id, setId] = useState(datosUsuario.id ?? null)
    const [fotoPerfil, setFotoPerfil] = useState(datosUsuario.fotoPerfil ?? "")

    //Funcion para volver a los estados 
    function LimpiarDatos() {
        setNombre("")
        setEmail("")
        setEdad("")
        setBarrio("")
        setFotoPerfil("")

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
        if (!email.trim() || email.indexOf("@") === -1) {
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

            const usuario = { //Creamos el objeto Usuario
                nombre,
                email,
                edad,
                barrio,
                fotoPerfil: fotoPerfil ? fotoPerfil : "../components/Iconos/perfil.avif", 
            }; // Si el usuario no sube foto de perfil, asignamos la predeterminada que tenemos guardada

        try {
            await agregarUsuario(usuario); // <- usando await
            Alert.alert("Usuario registrado correctamente x2");
            LimpiarDatos();
             // si querés volver a otra pantalla
        }finally{
            navigation.navigate("Inicio");
        }

 };
    return (
        <SafeAreaView style={{ paddingTop: 80 }} >
            <View >
                <View scrollEnabled={true}>
                    <KeyboardAvoidingView >
                        <ScrollView>
                            <InputTexto
                                placeholder="Nombre de Usuario"
                                onChangeText={setNombre}
                                value={nombre}
                            />
                            <InputTexto
                                placeholder="Correo Electronico"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                value={email}
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
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView>)
};

export default RegistroUsuario;

