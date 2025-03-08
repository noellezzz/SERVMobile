import React, { useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import Carousel, { Pagination } from 'react-native-reanimated-carousel'
import {
  useSharedValue,
} from 'react-native-reanimated'

import CustomSlide1 from './Client/Sections/Welcome/CustomSlide1'
import CustomSlide2 from './Client/Sections/Welcome/CustomSlide2'
import CustomSlide3 from './Client/Sections/Welcome/CustomSlide3'

const { width } = Dimensions.get('window')

const Welcome = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const progress = useSharedValue(0)

  const data = [
    { component: CustomSlide1, props: {} },
    { component: CustomSlide2, props: {} },
    { component: CustomSlide3, props: { 
      navigation 
    } },
  ]

  const handleSnapToItem = index => {
    setActiveIndex(index)
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
        onSnapToItem={handleSnapToItem}
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
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Welcome
