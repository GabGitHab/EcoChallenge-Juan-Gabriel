import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import ParticipacionView from './ParticipacionView';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { obtenerUNAParticipacionPorReto, obtenerParticipacionesPorReto } from '../../fetchers/fetchParticipaciones';
import Boton from '../Boton';

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
                setParticipaciones(Array.isArray(respuesta) ? respuesta : [respuesta]);
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
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={participaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <ParticipacionView
                    comentario={item.comentario}
                    nomUsuario={item.nombre}
                    estado={item.estadoDeRevision}
                    onPress={() => navigation.navigate('VerParticipacion', { id: item.id })}
                />
                )}
                ListFooterComponent=
                    {soloUna ? (
                        <Boton 
                            backgroundColor="#d3ffbb"
                            titulo="Ver todas las participaciones"
                            evento={() => navigation.navigate('DetallesReto', { id: idReto })}
                        />
                    ) : null }
                />
                {participaciones.length === 0 && (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay participaciones para este reto.</Text>
                )}
        </SafeAreaView>
  )
}

export default ListaParticipaciones