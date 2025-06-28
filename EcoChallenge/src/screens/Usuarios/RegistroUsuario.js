import { useEffect, useState } from "react";
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";
import { agregarUsuario, modificarUsuario, obtenerUsuarioPorId } from "../../fetchers/fetchUsuarios";

//Creamos los estados del registro
const RegistroUsuario = ({ route, navigation }) => {
    const { id } = route.params ?? null;
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [edad, setEdad] = useState("")
    const [barrio, setBarrio] = useState("")
    const [fotoPerfil, setFotoPerfil] = useState("")

    useEffect(() => {
        esModificar();
    }, []);

    //Funcion para volver a los estados 
    function LimpiarDatos() {
        setNombre("")
        setEmail("")
        setEdad("")
        setBarrio("")
        setFotoPerfil("")

    }

    const esModificar = async () => {
        console.log("ID recibido: ", id);
        if (id != 0) {
            try {
                const usuarioMod = await obtenerUsuarioPorId(id);
                if (usuarioMod) {
                    setNombre(usuarioMod.nombre);
                    setEmail(usuarioMod.email);
                    setEdad(usuarioMod.edad.toString());
                    setBarrio(usuarioMod.barrio);
                    setFotoPerfil(usuarioMod.fotoPerfil);
                    console.log("Usuario encontrado: ", usuarioMod);
                } else {
                    Alert.alert("Usuario no encontrado");
                }
            } catch (error) {
                console.log("Error al obtener usuario: ", error);
            }
        }
    }

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

        if (id == 0) {
            const usuario = { //Creamos el objeto Usuario 
                nombre,
                email,
                edad,
                barrio,
                fotoPerfil: fotoPerfil ? fotoPerfil : "../components/Iconos/perfil.avif",
            };

            try {
                await agregarUsuario(usuario); // <- usando await
                Alert.alert("Usuario registrado correctamente!");
                LimpiarDatos();
            } finally {
                navigation.navigate("Inicio");
            }
        } else {
            const usuario = {
                id,
                nombre,
                email,
                edad,
                barrio,
                fotoPerfil: fotoPerfil ? fotoPerfil : "../components/Iconos/perfil.avif",
            };

            try {
                await modificarUsuario(usuario);
                Alert.alert("Usuario modificado correctamente");
                LimpiarDatos();
            } finally {
                navigation.navigate("Inicio");
            }
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

