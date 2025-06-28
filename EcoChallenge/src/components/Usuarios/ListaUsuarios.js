import React from 'react'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { getDb } from '../../db/BaseDeDatos'; // Asegúrate de que la ruta sea correcta
import { obtenerUsuarios, obtenerUsuarioPorNombre, eliminarUsuarioPorId, modificarUsuario } from '../../fetchers/fetchUsuarios';
import { Alert, Text, View } from 'react-native';
import Boton from '../Boton';
import imagenPerfil from '../Iconos/perfil.avif';
import { SafeAreaView } from 'react-native';

const ListaUsuarios = () => {
    const [Usuarios, setUsuarios] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getDb();

    useEffect(() => {   
        cargarUsuarios();
    }, [buscador]);

    const cargarUsuarios = async () => {
        setLoading(true);
        try {
            let usuarios;
            if (buscador === "") {
                usuarios = await obtenerUsuarios();
                console.log("Usuarios obtenidos en effect", usuarios);
            } else {
                usuarios = await obtenerUsuarioPorNombre(buscador);
                console.log("Usuarios obtenidos por nombre en effect", usuarios);
            }
            setUsuarios(usuarios);
        } catch (error) {
            console.log("Error al obtener usuarios: ");
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            eliminarUsuarioPorId(id);
            console.log("Usuario eliminado");
            Alert.alert("Usuario eliminado");
            cargarUsuarios();
        }
        catch (error) {
            console.log("Error al eliminar usuario: ", error);
            Alert.alert("Error al eliminar usuario", error.message);
        };
    };

    const onEdit = async (id) =>
    {
        try
        {
            //logica para llevarlo a registrar usuario pero completar los campos necesarios
        }
        catch (error){
            console.log("Error al editar usuario: ", error);
            Alert.alert("Error al editar usuario", error.message);
        }
    };


  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        <View style = {{ flex: 1, padding: 10, backgroundColor: 'grey' }}>
            <FlatList
                data = {Usuarios}
                keyExtractor = {(item) => item.id.toString()}
                renderItem = {({ item }) => (
                    <View>
                        <Text style = {{ fontSize: 18, margin : 10, textAlign: 'center' }}>
                            {item.nombre} - {item.edad} - {item.barrio} - {item.puntajeTotal} 
                        </Text>
                        <Boton
                            titulo = "X"
                            evento = {() => onDelete(item.id.toString())}
                        />
                        <Boton
                            titulo = "Editar"
                            evento = {() => onEdit(item.id.toString())}
                        />
                    </View>
                )}
                ListHeaderComponent={() => (
                <Text style={{ fontSize: 22, marginVertical : 12, textAlign: 'center' }}>Usuarios Registrados</Text>
                )}
                ListEmptyComponent={() => (
                <Text style={ { fontSize: 22, marginVertical : 12, textAlign: 'center', color: 'red' } }>No hay usuarios aún.</Text>
                )}
            />
        </View>
    </SafeAreaView>
  )
}

export default ListaUsuarios