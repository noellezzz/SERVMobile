import { View, Text, Image } from 'react-native'
import React from 'react'

const PersonCard = ({ image, name, title }) => {
  return (
    <View style={{ width: '100%', marginVertical: 10 }}>
      <View
        style={{
          width: '100%',
          height: 300,
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 24,
          padding: 20,
        }}
      >
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              elevation: 5,
              backgroundColor: '#960303',
              borderRadius: 12,
              padding: 10,
              paddingHorizontal: 100,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 500,
                textAlign: 'center',
                width: '100%',
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PersonCard
