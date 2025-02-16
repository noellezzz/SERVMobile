import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, Button } from 'react-native'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'
import WordMark from '../../assets/SERV-adm.png'
import Logo from '../../assets/SERV_Logo.png'
import HeroSection from './Client/Sections/HeroSection'
import {
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ContainerTile from '../Components/Card/ContainerTile'

const { width } = Dimensions.get('window')

const CustomSlide1 = ({ navigation }) => {
  return (
    <View style={[{ backgroundColor: '#691414', flex: 1 }]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}
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
        <Image
          source={WordMark}
          style={{ width: '50%', height: 100, resizeMode: 'contain' }}
        />
        <Image
          source={Logo}
          style={{ width: '50%', height: 200, resizeMode: 'contain' }}
        />
        <Text style={{ color: 'white', fontSize: 50, fontWeight: 800 }}>
          WELCOME
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          This is a smart pp that evaluates senior citizens' behavior in service
          lines. By combining behavioral tests, feedback, and AI analysis, it
          optimizes queue management, reduces wait times, and enhances
          satisfaction.
        </Text>
        <View style={{ height: 50, width: '100%', marginVertical: 20 }}>
          <ContainerTile>
            <View style={{ width: '100%' }}>
              <TouchableWithoutFeedback
                style={{ height: '100%', width: '100%' }}
                onPress={() => navigation.navigate('ClientStack')}
              >
                <View style={{ height: '100%', width: '100%' }}>
                  <Text style={{ textAlign: 'center' }}>Try Now!</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ContainerTile>
        </View>
        <Button
          title="Go to Admin"
          onPress={() => navigation.navigate('AdminDrawer')}
        />
      </View>
    </View>
  )
}

// Rest of your components remain the same
const CustomSlide2 = props => {
  return (
    <View style={[styles.slide, { backgroundColor: '#feb47b', flex: 1 }]}>
      <Text style={styles.text}>Custom View 2</Text>
    </View>
  )
}

const CustomSlide3 = props => {
  return (
    <View style={[styles.slide, { backgroundColor: '#86A8E7', flex: 1 }]}>
      <Text style={styles.text}>Custom View 3</Text>
    </View>
  )
}

const Welcome = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const progress = useSharedValue(0)

  const data = [
    { component: CustomSlide1, props: { navigation } },
    { component: CustomSlide2, props: { navigation } },
    { component: CustomSlide3, props: { navigation } },
  ]

  const onPressPagination = index => {
    progress.value = index
  }

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={width}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => {
          const Component = item.component
          return <Component {...item.props} />
        }}
        onProgressChange={progress}
        onSnapToItem={setActiveIndex}
      />

      <Pagination.Custom
        progress={progress}
        data={data}
        size={20}
        dotStyle={{
          borderRadius: 16,
          height: 5,
          width: 40,
          backgroundColor: 'gray',
        }}
        activeDotStyle={{
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
        containerStyle={{
          gap: 5,
          marginBottom: 10,
          alignItems: 'center',
          height: 10,
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
        }}
        horizontal
        onPress={onPressPagination}
        customReanimatedStyle={(progress, index, length) => {
          let val = Math.abs(progress - index)
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length)
          }

          return {
            transform: [
              {
                translateY: interpolate(
                  val,
                  [0, 1],
                  [0, 0],
                  Extrapolation.CLAMP,
                ),
              },
            ],
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    width: '100%',
    height: 200,
    backgroundColor: '#ff7e5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Welcome
