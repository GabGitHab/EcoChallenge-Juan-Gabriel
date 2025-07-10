import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Boton from '../Boton'
import { obtenerSesion } from '../../session/ServiciosSession'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../context/contextoUsuario'
import { obtenerParticipacionPorUsuario } from '../../fetchers/fetchParticipaciones'

const ParticiparBoton = ({ id }) => {
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigation();
    const { usuario, setUsuario } = useUser();
    const [participando, setParticipa] = useState(false);

    const participa =async () => {
        setLoading(true);

        try {
            if (!usuario) {
                Alert.alert("Error", "Debes iniciar sesión para participar en un reto.");
                return;
            };
            const resp = await obtenerParticipacionPorUsuario(usuario.id, id);
            if (resp) {
                Alert.alert("Ya participaste", "No puedes participar en el mismo reto más de una vez.",
                    [
                        {
                            text: "Aceptar",
                            onPress: () => navigation.goBack('MenuRetos'),
                        }
                    ]
                );
                return true;
            }
        } finally {
            setLoading(false);
            return false;
        }
    }

    const OnClick = async () =>
    {
        setLoading(true);
        
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
            setParticipa(await participa());
            if (participando === true) {
                setLoading(false);
            }else{
                setLoading(false);
                navigation.navigate('AgregarParticipacion', { idReto : id });
            }
        };
    }
        
  return (
    
        <Boton
            backgroundColor='#d3ffbb'
            titulo={loading ? "Cargando..." : "Participar"}
            evento={() => OnClick()}
            disabled={participando}        
        />
  )
}

export default ParticiparBoton;