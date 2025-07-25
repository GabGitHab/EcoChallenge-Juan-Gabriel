import { View, Text, StyleSheet } from "react-native";
import Boton from "../../components/Boton";
import ListaRetos from "../../components/Retos/ListaRetos";

const MenuRetos = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Retos</Text>
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Registrar Reto"
                evento={() => navigation.navigate("RegistroRetos")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Editar Reto"
                evento={() => navigation.navigate("EditarRetos")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Borrar Reto"
                evento={() => navigation.navigate("BorrarRetos")}
            />
            <ListaRetos />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e0f7fa',
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default MenuRetos;