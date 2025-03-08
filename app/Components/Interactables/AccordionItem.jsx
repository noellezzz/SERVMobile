import React, { useRef, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const AccordionItem = ({ isExpanded, children, duration = 500, style }) => {
  const height = useSharedValue(0)
  const viewRef = useRef(null)

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, measuredHeight) => {
        height.value = isExpanded ? measuredHeight : 0
      })
    }
  }, [isExpanded])

  const bodyStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration }),
  }))

  return (
    <Animated.View style={[styles.animatedView, bodyStyle, style]}>
      <View ref={viewRef} style={styles.wrapper}>
        {children}
      </View>
    </Animated.View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
})
