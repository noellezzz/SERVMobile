import { View, Text, Image } from 'react-native'
import ContainerTile from '../Card/ContainerTile'
import React from 'react'

const SplitLayoutImage = ({ image, text, subtext, reverse }) => {
  return (
    <View
      style={{
        flexDirection: reverse ? 'row-reverse' : 'row',
        marginVertical: 10,
        gap: 5,
      }}
    >
      <View style={{ flex: 1, height: 200 }}>
        <ContainerTile>
          <Image
            source={image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              borderRadius: 36,
            }}
          />
        </ContainerTile>
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 500 }}>{text}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{subtext}</Text>
      </View>
    </View>
  )
}

export default SplitLayoutImage
