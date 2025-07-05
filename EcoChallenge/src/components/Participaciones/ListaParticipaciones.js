import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useState, useEffect } from 'react';
import ParticipacionView from './ParticipacionView';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { obtenerUNAParticipacionPorReto } from '../../fetchers/fetchParticipaciones';

const ListaParticipaciones = ({ idReto, soloUna }) => {
    const [participaciones, setParticipaciones] = useState([]);
    const navigation = useNavigation();


    useEffect(() =>{
        obtenerParticipaciones();
    },[]);

    const obtenerParticipaciones = async () => {
        if (soloUna)
        {
            try{
            const respuesta = await obtenerUNAParticipacionPorReto(idReto);
            if (respuesta) {
                setParticipaciones(respuesta);
            };
            }catch (error) {
                console.error("Error al obtener la participacion:", error);
            };
        }else{
            try {
                const respuesta = await obtenerParticipacionesPorReto(idReto);
                if (respuesta) {
                    setParticipaciones(respuesta);
                };
            }catch (error) {
                console.error("Error al obtener las participaciones:", error);
            };
        };
    };

  return (
    <View>
      <Text>ListaParticipaciones</Text>
    </View>
  )
}

export default ListaParticipaciones