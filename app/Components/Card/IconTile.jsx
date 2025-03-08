import { View, Text } from 'react-native'
import React from 'react'

const IconTile = ({ icon, percentage, label }) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {icon}
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '800',
            marginTop: 5,
            textAlign: 'center',
          }}
        >
          {percentage}
        </Text>
      </View>

      <Text
        style={{
          marginTop: 15,
          color: 'white',
          fontSize: 10,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  )
}

export default IconTile
