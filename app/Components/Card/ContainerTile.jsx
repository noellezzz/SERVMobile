import { View, Text } from 'react-native'
import React from 'react'

const ContainerTile = ({ children }) => {
  return (
    <View
      style={{
        elevation: 10,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 32,
        padding: 10,
        paddingVertical: 15,
        textAlign: 'center',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {children}
    </View>
  )
}

export default ContainerTile
