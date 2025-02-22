import React from 'react'
import { Pressable, Text, View } from 'react-native'

const CustomButton = ({
  title,
  onPress,
  style,
  disabled = false,
  mode = 'contained',
  icon: Icon,
}) => {
  const isContained = mode === 'contained'

  return (
    <Pressable
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 15,
          borderRadius: 12,
          backgroundColor: isContained
            ? disabled
              ? '#A9A9A9'
              : '#D21414'
            : 'transparent',
          borderWidth: isContained ? 0 : 2,
          borderColor: disabled ? '#A9A9A9' : '#D21414',
          elevation: isContained ? (disabled ? 0 : 5) : 0,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={!disabled ? onPress : null}
    >
      {Icon && (
        <View style={{ marginRight: 8 }}>
          <Icon
            color={isContained ? 'white' : disabled ? '#A9A9A9' : '#D21414'}
            size={20}
          />
        </View>
      )}
      <Text
        style={{
          color: isContained ? 'white' : disabled ? '#A9A9A9' : '#D21414',
          fontWeight: '500',
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default CustomButton
