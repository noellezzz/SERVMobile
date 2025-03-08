import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import HeroSection from '../../../Client/Sections/HeroSection'
import ContainerTile from '../../../../Components/Card/ContainerTile'
import WordMark from '../../../../../assets/SERV-adm.png'
import Logo from '../../../../../assets/SERV_Logo.png'

const CustomSlide2 = ({ navigation }) => {
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
        {/* ABOUT and WordMark in a row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 50,
              fontWeight: '800',
              marginRight: 20,
            }}
          >
            ABOUT
          </Text>
          <Image
            source={WordMark}
            style={{ width: 200, height: 130, resizeMode: 'contain' }}
          />
        </View>
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
            marginVertical: 20,
            marginHorizontal: 20,
          }}
        >
          SERV is an intelligent web and mobile application designed to enhance
          queue management by analyzing senior citizens' behavior in service
          lines. Using a combination of behavioral tests, real-time feedback,
          and AI-driven insights, SERV streamlines the waiting experience,
          reduces congestion, and improves service satisfaction.
        </Text>
        {/* <View style={{ height: 50, width: '100%', marginVertical: 20 }}>
          <ContainerTile>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ClientStack')}
            >
              <View style={{ height: '100%', width: '100%' }}>
                <Text style={{ textAlign: 'center' }}>Try Now!</Text>
              </View>
            </TouchableWithoutFeedback>
          </ContainerTile>
        </View>
        <Button
          title="Go to Admin"
          onPress={() => navigation.navigate('AdminDrawer')}
        /> */}
      </View>
    </View>
  )
}

export default CustomSlide2
