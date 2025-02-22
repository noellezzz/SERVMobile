import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import HeroSection from './Sections/HeroSection'
import wordmark from '../../../assets/SERV-adm.png'
import CustomButton from '../../Components/Buttons/CustomButton'

const Contact = () => {
  return (
    <View
      style={{
        backgroundColor: '#691414',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
      >
        <HeroSection />
      </View>
      <View
        style={{
          padding: 20,
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={wordmark}
          style={{ width: 200, height: 100, resizeMode: 'contain' }}
        />
        <View
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 24,
            elevation: 5,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Contact Form</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'gray',
              marginBottom: 10,
            }}
          ></View>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 12,
              padding: 15,
              marginVertical: 5,
            }}
            placeholder="Your Name"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 12,
              padding: 15,
              marginVertical: 5,
            }}
            placeholder="Your Email"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 12,
              padding: 15,
              marginVertical: 5,
              height: 100,
            }}
            placeholder="Your Message"
            multiline
          />
          <View style={{ marginVertical: 20 }}>
            <CustomButton title="Submit" />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Contact
