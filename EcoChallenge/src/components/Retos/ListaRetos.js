import React from 'react'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View, Text } from 'react-native'
import { obtenerRetos } from '../../fetchers/fetchRetos'
import CardRetos from './CardRetos'

const ListaRetos = ({ navigation }) => {
    const [retos, setRetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRetos();
    }, []);

    const fetchRetos = async () => {
        setLoading(true);
        try{
            const rep = await obtenerRetos();
            if (rep){
                setRetos(Array.isArray(rep) ? rep : [rep]);
            }
        }
        catch(error){
            setError(error);
        }
        finally {
            setLoading(false);
        }        
    };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <FlatList
            data={retos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <CardRetos
                idReto={item.id}
                titulo={item.titulo}
                categoria={item.categoria}
                descripcion={item.descripcion}
                puntajeAsign={item.puntajeAsign}
                fechaLimite={item.fechaLimite}
            />)}
            ListEmptyComponent={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop : 20 }}>
                    {loading ? (
                    <Text>Cargando retos...</Text>
                    ) : error ? (
                    <Text>Error al cargar los retos: {error.message}</Text>
                    ) : (
                    <Text>No hay retos disponibles.</Text>
                    )}
                </View>
            )}
        />
    </SafeAreaView>
  )
}

export default ListaRetos;