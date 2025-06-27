import React from 'react'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { getDb } from '../../fetchers/fetchUsuarios'; // Asegúrate de que la ruta sea correcta
import { obtenerUsuarios, obtenerUsuarioPorEmail, eliminarUsuarioPorId, modificarUsuario } from '../../fetchers/fetchUsuarios';
import { Alert, Text, View } from 'react-native';
import { Boton } from '../Boton';
import imagenPerfil from '../Iconos/perfil.avif';

const ListaUsuarios = () => {
    const [Usuarios, setUsuarios] = useState([]);
    const [buscador, setBuscador] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getDb();

    useEffect(() => {
        setLoading(true);
        if (buscador == "")
        {
            try {
                const usuarios = obtenerUsuarios();
                console.log("Usuarios obtenidos");
                setUsuarios(usuarios);                
            }
            catch (error){
                console.log("Error al obtener usuarios: ", error);
                setError(error);
            }finally{ setLoading(false); };
        }
        else
        {
            try
            {
                const usuarios = obtenerUsuarioPorEmail(buscador);
                setUsuarios(usuarios);
                console.log("Usuarios obtenidos por email");
            }
            catch (error)
            {
                console.log("Error al obtener usuario por email: ", error);
                setError(error);
            } finally { setLoading(false); };
        }
        
    },[buscador]);

    const onDelete = async (id) => {
        try {
            eliminarUsuarioPorId(id);
            console.log("Usuario eliminado");
            Alert.alert("Usuario eliminado");
            Usuarios.remove((usuario) => usuario.id === id);
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
    <View style = {{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
        <FlatList
            data = {Usuarios}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {({ item }) => {
                <View>
                    <Text style = {{ fontSize: 18, margin : 10, textAlign: 'center' }}>
                        {item.nombre} - {item.edad} - {item.barrio} - {item.puntajeTotal} 
                    </Text>
                    <Boton
                        titulo = "X"
                        onPress = {() => onDelete(item.id)}
                    />
                    <Boton
                        titulo = "Editar"
                        onPress = {() => onEdit(item.id)}
                    />
                </View>
            }}
            ListHeaderComponent={() => (
            <Text style={{ fontSize: 22, margin : 12, textAlign: 'center' }}>Usuarios Registrados</Text>
            )}
            ListEmptyComponent={() => (
            <Text style={styles.vacio}>No hay usuarios aún.</Text>
            )}
        />
    </View>
  )
}

export default ListaUsuarios