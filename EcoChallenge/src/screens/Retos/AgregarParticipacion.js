import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { agregarParticipacion } from '../../fetchers/fetchParticipaciones';
import { useUser } from '../../components/context/contextoUsuario';

const AgregarParticipacion = ({ route, navigation }) => {
  const { idReto } = route.params;

  const [foto, setFoto] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [comentario, setComentario] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const participacion = null;

  const {usuario, setUsuario} = useUser();

  const onClick = async () => {
    if (!foto.trim() || !latitud.trim() || !longitud.trim()) {
      Alert.alert("Todos los campos son obligatorios.");
      return;
    };

    if (isNaN(latitud) || isNaN(longitud)) {
      Alert.alert("Latitud y Longitud deben ser números.");
      return;
    };

    try {
      setLoading(true);
      const participacionData = {
        id_usuario: usuario.id,
        id_reto: idReto,
        foto,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        comentario
      };
      const response = await agregarParticipacion(participacionData);
 
      Alert.alert("Participación agregada correctamente.");
      navigation.navigate('MenuRetos');
 
    } catch (error) {
      console.error(error);
      setError(error.message || "Error al agregar la participación.");
    } finally {
      setLoading(false);
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Participación</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Foto (URL):</Text>
          <TextInput
            style={styles.input}
            value={foto}
            onChangeText={setFoto}
            placeholder="https://..."
          />

          <Text style={styles.label}>Latitud:</Text>
          <TextInput
            style={styles.input}
            value={latitud}
            onChangeText={setLatitud}
            placeholder="-34.1234"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Longitud:</Text>
          <TextInput
            style={styles.input}
            value={longitud}
            onChangeText={setLongitud}
            placeholder="-56.2345"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Comentario:</Text>
          <TextInput
            style={styles.input}
            value={comentario}
            onChangeText={setComentario}
            placeholder="Tu comentario..."
            multiline
          />

          <Button
            title="Enviar participación"
            onPress={() => {onClick()}}
          />
        </View>
      )}
    </View>
  );
};

export default AgregarParticipacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  form: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
