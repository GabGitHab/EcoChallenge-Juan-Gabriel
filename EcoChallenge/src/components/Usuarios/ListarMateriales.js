import React from 'react'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { getDb } from '../../db/BaseDeDatos'; // Asegúrate de que la ruta sea correcta
import { obtenerUsuarios, obtenerMaterialPorNombre, eliminarUsuarioPorId, modificarUsuario } from '../../fetchers/fetchUsuarios';
import { Alert, Text, View } from 'react-native';
import Boton from '../Boton';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

const ListaMateriales = ({ navigation }) => {
    const [Materiales, setMateriales] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getDb();

    useEffect(() => {
        cargarMateriales();
    }, [buscador]);

    const cargarMateriales = async () => {
        setLoading(true);
        try {
            let materiales;
            if (buscador === "") {
                materiales = await obtenerMateriales();
                console.log("Usuarios obtenidos en effect", materiales);
            } else {
                materiales = await obtenerUsuarioPorNombre(buscador);
                console.log("Usuarios obtenidos por nombre en effect", materiales);
            }
            setMateriales(materiales);
        } catch (error) {
            console.log("Error al obtener materiales: ");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            eliminarMaterialesPorId(id);
            console.log("Material eliminado");
            Alert.alert("Material eliminado");
            cargarMateriales();
        }
        catch (error) {
            console.log("Error al eliminar usuario: ", error);
            Alert.alert("Error al eliminar usuario", error.message);
        };
    };

    return (
        <SafeAreaView style={styles.fondo}>
            <View style={{ flex: 1, padding: 10, }}>
                <FlatList
                    data={Materiales}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.vista}>
                            <Text style={{ fontSize: 18, margin: 10, textAlign: 'center' }}>
                                {item.nombre} - {item.edad} - {item.barrio} - {item.puntajeTotal}
                            </Text>
                            <Boton
                                backgroundColor="red"
                                titulo="X Borrar"
                                evento={() => onDelete(item.id.toString())}
                            />
                            <Boton
                                backgroundColor="#24adf3"
                                titulo="✏ Editar"
                                evento={() => navigation.navigate("RegistroMaterial", { id: item.id })}
                            />
                        </View>
                    )}
                    ListHeaderComponent={() => (
                        <Text style={{ fontSize: 22, marginVertical: 12, textAlign: 'center' }}>Usuarios Registrados</Text>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={{ fontSize: 22, marginVertical: 12, textAlign: 'center', color: 'red' }}>No hay usuarios aún.</Text>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default ListaMateriales

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#e0f7fa',
    },
    vista: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    }
});