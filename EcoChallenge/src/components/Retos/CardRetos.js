import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import ParticiparBoton from './ParticiparBoton'
import Boton from '../Boton'
import { useNavigation } from '@react-navigation/native'
import { eliminarRetoPorId } from '../../fetchers/fetchRetos'

const CardRetos = ({ titulo, categoria, descripcion, puntajeAsign, idReto, fechaLimite }) => {
  const navigation = useNavigation();
  
  const eliminarReto = async (id) => {
    try {
      await eliminarRetoPorId(id);
      Alert.alert("Reto eliminado con éxito");
      navigation.goBack('MenuRetos');
    } catch (error) {
      console.error("Error al eliminar el reto:", error);
    }};

  return (
    <Card style={{ margin: 5, padding: 5, backgroundColor: '#e0f7fa' }}>
      <Card.Title
        title={titulo}
        subtitle={categoria}
        left={() => (
          <View style={{ backgroundColor: '#4dd0e1', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>{fechaLimite}</Text>
          </View>
        )}
        right={() => <ParticiparBoton id={idReto} />}
      />

      <Card.Content>
        <Text style={{ marginBottom: 10 }}>{descripcion}</Text>
        <Text style={{ color: '#757575' }}>Puntos obtenibles: {puntajeAsign}</Text>
      </Card.Content>

      <Card.Actions>
        <Boton
          backgroundColor='#d3ffbb'
          titulo="Detalles"
          evento={() => navigation.navigate('DetallesReto', { id: idReto })}
        />
        <Boton
          backgroundColor='#d3ffbb'
          titulo="Eliminar"
          evento={() => eliminarReto(idReto)}
        />
      </Card.Actions>
    </Card>
  )
}

export default CardRetos
