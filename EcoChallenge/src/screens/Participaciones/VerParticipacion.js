import { View, Text } from 'react-native'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { obtenerParticipacionPorId } from '../../fetchers/fetchParticipaciones'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


const VerParticipacion = (route, navigation) => {
  const { id } = route.params ?? { id: 0 }
  const [participacion, setParticipacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id!== o){
      getParticipacion();
    }else{
      navigation.navigate("MenuRetos");
    }
  }, [id]);

  const getParticipacion = async () => {
      try{
        setLoading(true);
        const resp = await obtenerParticipacionPorId(id);
        if (resp){
          setParticipacion(resp);
          console.log("Participacion obtenida: ", resp);
        };
      }catch (error) {
        setError(error);
        console.log("Error al obtener participacion: ", error);
      }
  };
    return (
  <View style={styles.container}>
    {loading ? (
      <Text style={styles.message}>Cargando participación...</Text>
    ) : error ? (
      <Text style={[styles.message, styles.error]}>Error: {error}</Text>
    ) : !participacion ? (
      <Text style={styles.message}>No se encontró información.</Text>
    ) : (
      <View style={styles.card}>
        <Text style={styles.title}>Detalle de Participación</Text>
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{participacion.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ID Usuario:</Text>
          <Text style={styles.value}>{participacion.id_usuario}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ID Reto:</Text>
          <Text style={styles.value}>{participacion.id_reto}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Foto:</Text>
          <Text style={styles.value}>{participacion.foto || 'Sin foto'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Latitud:</Text>
          <Text style={styles.value}>{participacion.latitud}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Longitud:</Text>
          <Text style={styles.value}>{participacion.longitud}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Comentario:</Text>
          <Text style={styles.value}>{participacion.comentario || 'Sin comentario'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estado de Revisión:</Text>
          <Text style={styles.value}>{participacion.estadoDeRevision}</Text>
        </View>
      </View>
    )}
  </View>
);
}

export default VerParticipacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    color: '#333',
  },
  error: {
    color: 'red',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
});
