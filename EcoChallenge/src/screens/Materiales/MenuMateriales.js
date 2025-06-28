import { View, Text, StyleSheet } from "react-native";
import Boton from "../../components/Boton";

const MenuMateriales = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Material</Text>
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Registrar Material"
                evento={() => navigation.navigate("RegistroMaterial")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Editar Material"
                evento={() => navigation.navigate("EditarMaterial")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Borrar Material"
                evento={() => navigation.navigate("BorrarMaterial")}
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

export default MenuMateriales;