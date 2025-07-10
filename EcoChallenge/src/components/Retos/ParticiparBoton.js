import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Boton from '../Boton'
import { obtenerSesion } from '../../session/ServiciosSession'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../context/contextoUsuario'

const ParticiparBoton = ({ id }) => {
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigation();
    const { usuario, setUsuario } = useUser();

    const OnClick = async () =>
    {

        if (!usuario)
        {
            Alert.alert("Error", "Debes iniciar sesion para participar en un reto.",
                        [
                        {
                            text: "Ir al registro",
                            onPress: () => navigation.navigate('RegistroUsuario'),
                        },
                        {
                            text: "Cancelar",
                            style: "cancel",
                        }
                        ]    
            );
        }
        else{
            navigation.navigate('AgregarParticipacion', { idReto : id });
        };

    }
        
  return (
    
        <Boton
            backgroundColor='#d3ffbb'
            titulo={loading ? "Cargando..." : "Participar"}
            evento={() => OnClick()}        
        />
  )
}

export default ParticiparBoton;