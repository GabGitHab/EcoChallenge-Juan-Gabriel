import { View, Text } from 'react-native'
import React from 'react'

const VerReto = ({route, navigation}) => {
  const { id } = route.params;

  return (
    <View>
      <Text>VerReto</Text>
    </View>
  )
}

export default VerReto