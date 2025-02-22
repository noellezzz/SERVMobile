import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

const ModeSelector = ({ options, selectedOption, changeMode }) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 12,
      }}
    >
      {options.map((option, index) => (
        <TouchableWithoutFeedback
          key={option}
          onPress={() => changeMode(option)}
        >
          <Text
            style={{
              padding: 14,
              paddingHorizontal: 22,
              borderWidth: 2,
              borderRightWidth: index !== options.length - 1 ? 1 : 2,
              borderTopLeftRadius: index === 0 ? 12 : 0,
              borderBottomLeftRadius: index === 0 ? 12 : 0,
              borderTopRightRadius: index === options.length - 1 ? 12 : 0,
              borderBottomRightRadius: index === options.length - 1 ? 12 : 0,
              backgroundColor: selectedOption === option ? '#FDF3F3' : 'white',
              borderColor: selectedOption === option ? '#D21414' : 'gray',
              color: selectedOption === option ? '#D21414' : 'gray',
              fontWeight: 500,
            }}
          >
            {option}
          </Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  )
}

export default ModeSelector
