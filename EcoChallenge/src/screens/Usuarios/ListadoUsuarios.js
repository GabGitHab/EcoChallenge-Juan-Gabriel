import { View, Text, SafeAreaView } from 'react-native'
import ListaUsuarios from '../../components/Usuarios/ListaUsuarios'
import Boton from '../../components/Boton'

const ListadoUsuarios = ( { navigation } ) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
          <ListaUsuarios/>
      </View>
      <View style={{ padding: 10 }}>
        <Boton 
            backgroundColor="#d3ffbb"
            titulo = "Volver al Menu"
            evento = {() => navigation.navigate("MenuUsuario")}
        />
      </View>
    </SafeAreaView>
  )
}

export default ListadoUsuarios