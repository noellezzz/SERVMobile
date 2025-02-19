import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CustomSlide2 = () => {
  return (
    <View style={[styles.slide, { backgroundColor: '#feb47b', flex: 1 }]}>
      <Text style={styles.text}>Custom View 2</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default CustomSlide2
