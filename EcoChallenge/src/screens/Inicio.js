import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Boton from "../components/Boton";


const Inicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>EcoChallenge</Text>
            <Boton
                backgroundColor="#d3ffbb"
                titulo="Menu Usuario"
                evento={() => navigation.navigate("MenuUsuario")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                color="blue"
                titulo="Menu Retos"
                evento={() => navigation.navigate("MenuRetos")}
            />
            <Boton
                backgroundColor="#d3ffbb"
                color="blue"
                titulo="Menu Materiales"
                evento={() => navigation.navigate("MenuMateriales")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    }
});

export default Inicio;
