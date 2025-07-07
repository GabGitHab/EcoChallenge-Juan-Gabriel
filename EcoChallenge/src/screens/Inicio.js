import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import Boton from "../components/Boton";

const Inicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
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
            <Text>Por Gabriel Larrosa y Juan Luviera</Text>
        </View>
    );
};

export default Inicio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e0f7fa',
    },
    logo: {
        width: 800,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20
    },

});