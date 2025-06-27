import { View, Text, StyleSheet } from "react-native";
import Boton from "../../components/Boton";

const MenuUsuario = ({ navigation }) => {
    return (
        <View style={styles.container} scrollEnabled={true}>
            <Text style={styles.titulo}>Usuario</Text>
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Registrar Usuario"
                evento={() => navigation.navigate("RegistroUsuario")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Editar Usuario"
                evento={() => navigation.navigate("EditarUsuario")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Borrar Usuario"
                evento={() => navigation.navigate("BorrarUsuario")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Ver usuarios"
                evento={() => navigation.navigate("ListadoUsuarios")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default MenuUsuario;