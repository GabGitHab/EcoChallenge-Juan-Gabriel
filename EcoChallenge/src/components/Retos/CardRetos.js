import { View, Text } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import ParticiparBoton from './ParticiparBoton'
import Boton from '../Boton'
import { useNavigation } from '@react-navigation/native'

const CardRetos = ({ titulo, categoria, descripcion, puntajeAsign, idReto, fechaLimite }) => {
  const navigation = useNavigation();
  
  return (
    <Card style={{ margin: 10, padding: 10, backgroundColor: '#e0f7fa' }}>
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
      </Card.Actions>
    </Card>
  )
}

export default CardRetos
