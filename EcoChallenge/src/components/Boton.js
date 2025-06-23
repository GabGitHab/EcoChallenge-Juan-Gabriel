import { CurrentRenderContext } from "@react-navigation/native";
import React, { version } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Boton = (props) => {
    return (
        <TouchableOpacity style={[styles.boton,
        { backgroundColor: props.backgroundColor }]} onPress={props.evento}>
            <View style={styles.view}>
                <Icon style={styles.icono} name={props.iconoBoton} size={40} color="white" />
                <Text style={styles.texto}>{props.titulo}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#d3ffbb',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10
    },
    texto: {
        color: 'black',
        fontSize: 16,

    }
});

export default Boton;