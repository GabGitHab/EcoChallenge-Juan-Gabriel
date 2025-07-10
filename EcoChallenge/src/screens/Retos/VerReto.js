import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, KeyboardAvoidingView, ScrollViewComponent } from 'react-native';
import Boton from '../../components/Boton';
import { obtenerRetoPorId } from '../../fetchers/fetchRetos';
import ListaParticipaciones from '../../components/Participaciones/ListaParticipaciones';
import { SafeAreaView } from 'react-native';

const VerReto = ({ route, navigation }) => {
  const { id } = route.params;
  const [reto, setReto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    getReto();
  },[id]);

  const getReto = async () =>{
    setLoading(true);
    try{
      const resp = await obtenerRetoPorId(id);
      if (resp) {
        setReto(resp);
      }
    }
    catch(error) {
      setError(error);
    }
    finally{
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Cargando reto...</Text>
      </View>
    );
  }

  if (!reto) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No se encontró el reto.</Text>
        <Boton titulo="Volver" evento={() => navigation.goBack('MenuRetos')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.value}>{reto.titulo}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.value}>{reto.descripcion || 'Sin descripción'}</Text>

      <Text style={styles.label}>Categoría:</Text>
      <Text style={styles.value}>{reto.categoria || 'Sin categoría'}</Text>

      <Text style={styles.label}>Fecha Límite:</Text>
      <Text style={styles.value}>{reto.fechaLimite || 'No definida'}</Text>

      <Text style={styles.label}>Puntaje Asignado:</Text>
      <Text style={styles.value}>{reto.puntajeAsign}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Volver a Menú" onPress={() => navigation.navigate('MenuRetos')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fefefe',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16,
    color: '#444',
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  buttonContainer: {
    marginTop: 30,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default VerReto;
