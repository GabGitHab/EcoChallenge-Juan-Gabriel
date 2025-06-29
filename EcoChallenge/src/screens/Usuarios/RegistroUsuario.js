import { useEffect, useState } from "react";
import { Alert, Image, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Text } from "react-native";
import InputTexto from "../../components/InputTexto";
import Boton from "../../components/Boton";
import { agregarUsuario, modificarUsuario, obtenerUsuarioPorId } from "../../fetchers/fetchUsuarios";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { StyleSheet } from "react-native";

const RegistroUsuario = ({ route, navigation }) => {
    const { id } = route.params ?? { id: 0 };

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [edad, setEdad] = useState("");
    const [barrio, setBarrio] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        esModificar();
    }, []);

    const LimpiarDatos = () => {
        setNombre("");
        setEmail("");
        setEdad("");
        setBarrio("");
        setFotoPerfil("");
        setImagePreview(null);
    };

    const esModificar = async () => {
        if (id !== 0) {
            try {
                const usuarioMod = await obtenerUsuarioPorId(id);
                if (usuarioMod) {
                    setNombre(usuarioMod.nombre);
                    setEmail(usuarioMod.email);
                    setEdad(usuarioMod.edad.toString());
                    setBarrio(usuarioMod.barrio);
                    setFotoPerfil(usuarioMod.fotoPerfil);
                    setImagePreview(usuarioMod.fotoPerfil);
                } else {
                    Alert.alert("Usuario no encontrado");
                }
            } catch (error) {
                console.log("Error al obtener usuario: ", error);
            }
        }
    };

    const pedirPermisos = async () => {
        const cam = await ImagePicker.requestCameraPermissionsAsync();
        const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cam.granted || !gal.granted) {
            Alert.alert("Permisos requeridos", "Habilita acceso a la cámara y la galería.");
            return false;
        }
        return true;
    };

    const pickFromGallery = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            const asset = result.assets[0];
            setImagePreview(asset.uri);
            setFotoPerfil(asset.uri);
        }
    };

    const takePhoto = async () => {
        if (!(await pedirPermisos())) return;
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1
        });
        if (!result.canceled) {
            const asset = result.assets[0];
            setImagePreview(asset.uri);
            setFotoPerfil(asset.uri);
        }
    };

    const registrarUsuario = async () => {
        if (!nombre.trim()) {
            Alert.alert("Debe completar el campo con su Nombre completo");
            return;
        }
        if (!email.trim() || email.indexOf("@") === -1) {
            Alert.alert("Debe ingresar un correo electrónico válido");
            return;
        }
        if (!edad.trim() || parseInt(edad) < 1) {
            Alert.alert("Debe completar el campo con su Edad");
            return;
        }
        if (!barrio.trim()) {
            Alert.alert("Debe completar el campo con el nombre de su Barrio o Zona");
            return;
        }

        let rutaFinal = fotoPerfil;

        if (fotoPerfil && fotoPerfil.startsWith("file://")) {
            const nombreArchivo = fotoPerfil.split('/').pop();
            const nuevaRuta = FileSystem.documentDirectory + nombreArchivo;
            try {
                await FileSystem.copyAsync({
                    from: fotoPerfil,
                    to: nuevaRuta
                });
                rutaFinal = nuevaRuta;
            } catch (error) {
                console.error("Error al guardar la imagen local:", error);
            }
        }

        const usuario = {
            id,
            nombre,
            email,
            edad,
            barrio,
            fotoPerfil: rutaFinal || "../components/Iconos/perfil.avif"
        };

        try {
            if (id === 0) {
                await agregarUsuario(usuario);
                Alert.alert("Usuario registrado correctamente!");
            } else {
                await modificarUsuario(usuario);
                Alert.alert("Usuario modificado correctamente");
            }
            LimpiarDatos();
            navigation.navigate("Inicio");
        } catch (error) {
            console.log("Error al guardar/modificar usuario: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.fondo}>
            <View>
                <KeyboardAvoidingView>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                        <InputTexto
                            placeholder="Nombre de Usuario"
                            onChangeText={setNombre}
                            value={nombre}
                        />
                        <InputTexto
                            placeholder="Correo Electrónico"
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

                        {/* Imagen de perfil */}
                        <View style={{ alignItems: "center", marginVertical: 16 }}>
                            {imagePreview ? (
                                <Image
                                    source={{ uri: imagePreview }}
                                    style={{ width: 150, height: 150, borderRadius: 75 }}
                                />
                            ) : (
                                <Text style={{ color: "#fd0303" }}>No hay imagen seleccionada</Text>
                            )}
                        </View>
                        <Boton
                            backgroundColor="#d3ffbb"
                            titulo="Elegir de galería" evento={pickFromGallery} />
                        <View style={{ height: 10 }} />
                        <Boton
                            backgroundColor="#d3ffbb"
                            titulo="Tomar foto" evento={takePhoto} />
                        <View style={{ height: 20 }} />
                        <Boton
                            backgroundColor="#25d366"
                            titulo="💾 Guardar Usuario"
                            evento={registrarUsuario}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default RegistroUsuario;

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#e0f7fa',

    }
});