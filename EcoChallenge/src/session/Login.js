import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { KeyboardAvoidingView, ScrollView, View, Alert, Image } from "react-native"
import Boton from "../components/Boton"
import InputTexto from "../components/InputTexto"
import { useUser } from "../components/context/contextoUsuario";
import { StyleSheet } from "react-native"

const Login = ({ navigation }) => {
    const { setUsuario } = useUser()
    const [email, setEmail] = useState("")
    const [contraseña, setContraseña] = useState("")

    const LimpiarDatos = () => {
        setEmail("")
        setContraseña("")
    }
    const usuarioLogueado = async () => {
        if (!email.trim()) {
            Alert.alert("Debe ingresar un Email")
        }
        if (!contraseña.trim()) {
            Alert.alert("Debe ingresar una contraseña")
        }
        try {
            const datosUsuario = await AsyncStorage.getItem(email)
            LimpiarDatos()

            if (!datosUsuario) {
                Alert.alert("Usuario no registrado")
                return
            }
            const user = JSON.parse(datosUsuario);

            if (user.contraseña !== contraseña.trim()) {
                Alert.alert("Contraseña incorrecta");
                return;
            }

            setUsuario(user);
            navigation.navigate("Inicio");
        }
        catch (error) {
            Alert.alert("Error al iniciar sesion")
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                <InputTexto
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />
                <InputTexto
                    placeholder="Contraseña"
                    onChangeText={setContraseña}
                    value={contraseña}
                    secureTextEntry
                />
                <Boton
                    backgroundColor='#d3ffbb'
                    titulo=" 🙍‍♂️Ingresar"
                    evento={usuarioLogueado}
                />
            </ScrollView>
        </View >
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#e0f7fa',
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",

        width: 400,
        height: 150,
        resizeMode: 'contain',
    },
});