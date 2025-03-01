import * as React from 'react'
import { View, Dimensions } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { Text } from 'react-native'

// Define window dimensions
const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}

// Calculate item width to show part of next/prev slides
const ITEM_WIDTH = window.width * 0.82 // Make each item take 80% of screen width
const ITEM_HEIGHT = 258

// Define renderItem function with scaling for active item
const renderItem = ({ item, index, animationValue }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [0.9, 1.1, 0.9])

    return {
      transform: [{ scale }],
    }
  })

  return (
    <Animated.View
      key={index}
      style={[
        {
          backgroundColor: item,
          borderRadius: 20,
          width: ITEM_WIDTH,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: ITEM_HEIGHT,
          marginHorizontal: 0,
        },
        animatedStyle,
      ]}
    >
      <Text style={{ color: '#fff', fontSize: 18 }}>Item {index + 1}</Text>
    </Animated.View>
  )
}

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
]

function Index() {
  const progressValue = useSharedValue(0)

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: 'basic-layouts', name: 'parallax' }}
      style={{ flex: 1, justifyContent: 'center', height: '100%' }}
    >
      <Carousel
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        height={ITEM_HEIGHT}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        style={{ width: window.width }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 70,
        }}
        onProgressChange={progress => {
          progressValue.value = progress
        }}
        renderItem={({ item, index, animationValue }) =>
          renderItem({ item, index, animationValue })
        }
        itemSpacing={0}
        defaultIndex={0}
      />
    </View>
  )
}

export default Index
