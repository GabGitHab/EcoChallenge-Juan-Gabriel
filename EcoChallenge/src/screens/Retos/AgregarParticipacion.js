import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { agregarParticipacion } from '../../fetchers/fetchParticipaciones';
import { useUser } from '../../components/context/contextoUsuario';
import Boton from '../../components/Boton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { KeyboardAvoidingView } from 'react-native';

const AgregarParticipacion = ({ route, navigation }) => {
  const { idReto } = route.params;

  const [foto, setFoto] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [comentario, setComentario] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {usuario, setUsuario} = useUser();

  const LimpiarDatos = () => {
    setFoto('');
    setLatitud("");
    setLongitud('');
    setComentario('');
    setImagePreview(null);
    setLoading(false);
    setError(null);
  };

  const pedirPermisos = async () => {
      console.log("Pidiendo permisos de cámara y galería...");
      const cam = await ImagePicker.requestCameraPermissionsAsync();
      const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!cam.granted || !gal.granted) {
          Alert.alert("Permisos requeridos", "Habilita acceso a la cámara y la galería.");
          console.log("Permisos no concedidos");
          return false;
      }
      console.log("Permisos concedidos");
      return true;
  };

  const pickFromGallery = async () => {
      if (!(await pedirPermisos())) return;
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1
      });
      if (!result.canceled) {
          const asset = result.assets[0];
          setImagePreview(asset.uri);
          setFoto(asset.uri);
      }
  };

  const takePhoto = async () => {
      if (!(await pedirPermisos())) return;
      const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1
      });
      if (!result.canceled) {
          const asset = result.assets[0];
          setImagePreview(asset.uri);
          setFoto(asset.uri);
      }
  };

  const onClick = async () => {
    if (!foto.trim() || !latitud.trim() || !longitud.trim()) {
      Alert.alert("Todos los campos son obligatorios.");
      return;
    };

    if (isNaN(latitud) || isNaN(longitud)) {
      Alert.alert("Latitud y Longitud deben ser números.");
      return;
    };

    let rutaFinal = foto;
    console.log("Ruta de la imagen:", foto);
    if (foto && foto.startsWith("file://")) {
      console.log("entra al if");
        const nombreArchivo = foto.split('/').pop();
        console.log("Nombre del archivo:", nombreArchivo);
        const nuevaRuta = FileSystem.documentDirectory + nombreArchivo;
        console.log("Nueva ruta:", nuevaRuta);
        if (foto !== nuevaRuta) {
            console.log("Guardando imagen en nueva ruta:", nuevaRuta);
            try {
                await FileSystem.copyAsync({
                    from: foto,
                    to: nuevaRuta
                });
                rutaFinal = nuevaRuta;
                console.log("Imagen guardada localmente en:", rutaFinal);
            } catch (error) {
                console.error("Error al guardar la imagen local:", error);
            };
        } else {
            rutaFinal = foto;
        };
    };
    console.log("Ruta final de la imagen:", rutaFinal);
    try {
      setLoading(true);
      const participacionData = {
        id_usuario: usuario.id,
        id_reto: idReto,
        rutaFinal,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        comentario
      };
      const response = await agregarParticipacion(participacionData);
 
      Alert.alert("Participación agregada correctamente.");
      LimpiarDatos();
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
        
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 3 }} keyboardShouldPersistTaps="handled">
            <View style={styles.form}>
                    {/* Imagen de perfil */}
              <View style={{ alignItems: "center", marginVertical: 16 }}>
                  {imagePreview ? (
                      <Image
                          source={{ uri: imagePreview }}
                          style={{ width: 150, height: 150, borderRadius: 75 }}
                      />
                  ) : (
                      <Text style={{ color: "#fd0303" }}>No hay imagen seleccionada</Text>
                  )}
              </View>
              <Boton
                  backgroundColor="#d3ffbb"
                  titulo="Elegir de galería" evento={pickFromGallery} />
              <View style={{ height: 10 }} />
              <Boton
                  backgroundColor="#d3ffbb"
                  titulo="Tomar foto" evento={takePhoto} />
              <View style={{ height: 20 }} />

                {/* fin foto */}

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
          </ScrollView>
        </KeyboardAvoidingView>
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
