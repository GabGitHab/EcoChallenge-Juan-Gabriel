import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Boton from '../Boton'
import { obtenerSesion } from '../../session/ServiciosSession'
import { Button } from 'react-native-paper'
import { agregarParticipacion } from '../../fetchers/fetchParticipaciones'
import { useNavigation } from '@react-navigation/native'

const ParticiparBoton = ({ id }) => {
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigation();

    const OnClick = async () =>
    {
        setLoading(true);
        const user = await obtenerSesion();
        setLoading(false);

        if (!user)
        {
            Alert.alert("Error", "Debes iniciar sesion para participar en un reto.",
                        [
                        {
                            text: "Ir al registro",
                            onPress: () => navigation.reset('RegistroUsuario'),
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