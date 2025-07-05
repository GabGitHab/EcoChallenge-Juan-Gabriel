import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Boton } from '/../Boton'
import { obtenerSesion } from '../../session/ServiciosSession'
import { Button } from 'react-native-paper'
import { agregarParticipacion } from '../../fetchers/fetchParticipaciones'

const ParticiparBoton = ({props}) => {
    const [loading, setLoading] = useState(false); 

    const OnClick = async (idReto) =>
    {
        setLoading(true);
        const user = await obtenerSesion();
        setLoading(false);

        if (!user)
        {
            Alert.alert("Error", "Debes iniciar sesion para participar en un reto.",
                (() =>{
                <Button
                mode="contained"
                onPress={() => navigation.navigate('RegistroUsuario')}        
                style={{ marginTop: 10, backgroundColor: '#4CAF50' }}
                />
            }));
        };

        navigation.navigate('AgregarParicipacion', { idReto : idReto })
    }
        
  return (
    <Boton
        backgroundColor='#d3ffbb'
        titulo= "Participar"
        evento={() => OnClick(props.id)}        
    />
  )
}

export default ParticiparBoton