import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome } from '@expo/vector-icons'
import {
  Canvas,
  LinearGradient,
  RadialGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia'
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const HeroSection = () => {
  const { width, height } = useWindowDimensions()

  const color1 = useSharedValue('#ff6161')
  const color2 = useSharedValue('#960303')
  const color3 = useSharedValue('#691414')

  const colors = useDerivedValue(() => {
    return [color1.value, color2.value, color3.value]
  })

  return (
    <>
      <StatusBar style="light" />
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 52,
    right: 32,
    height: 64,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: '#111',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HeroSection
