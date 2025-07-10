import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import ListaUsuarios from '../../components/Usuarios/ListaUsuarios'
import Boton from '../../components/Boton'

const ListadoUsuarios = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ListaUsuarios navigation={navigation} />
      </View>
      <View style={{ padding: 10 }}>
        <Boton
          backgroundColor="#d3ffbb"
          titulo="Volver al Menu"
          evento={() => navigation.goBack("MenuUsuario")}
        />
      </View>
    </SafeAreaView>
  )
}

export default ListadoUsuarios

const styles = StyleSheet.create({
  flex: 1,
  backgroundColor: '#fff',

})