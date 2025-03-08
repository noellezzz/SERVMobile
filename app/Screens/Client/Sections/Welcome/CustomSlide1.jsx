import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import HeroSection from '../HeroSection'
import WordMark from '@/../assets/SERV-adm.png'
import Logo from '@/../assets/SERV_Logo.png'

const CustomSlide1 = () => {
  return (
    <View style={{ backgroundColor: '#691414', flex: 1 }}>
      <View
        style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
      >
        <HeroSection />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 50, fontWeight: '800' }}>
          WELCOME TO
        </Text>
        <Image
          source={WordMark}
          style={{ width: '50%', height: 100, resizeMode: 'contain' }}
        />
        <Image
          source={Logo}
          style={{ width: '50%', height: 200, resizeMode: 'contain' }}
        />

        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'justify',
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        ></Text>
      </View>
    </View>
  )
}

export default CustomSlide1
