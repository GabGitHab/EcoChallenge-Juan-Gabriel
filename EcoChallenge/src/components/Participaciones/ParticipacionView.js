import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from 'react-native-paper';

const ParticipacionView = ({ comentario, nomUsuario, estado }) => {
  const estadoColor = {
    pendiente: '#ffcc80',
    aprobado: '#a5d6a7',
    rechazado: '#ef9a9a',
  }[estado?.toLowerCase()] || '#e0e0e0';

  return (
    <View style={{
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      marginTop: 5
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{nomUsuario}</Text>
        <Chip style={{ backgroundColor: estadoColor }} textStyle={{ color: '#333' }}>
          {estado}
        </Chip>
      </View>

      <Text style={{ fontSize: 14, color: '#555' }}>{comentario}</Text>
    </View>
  );
};

export default ParticipacionView;
