import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setOption } from '../../States/Slice/formOptionsSlice'
import { Audio } from 'expo-av'
import { ActivityIndicator } from 'react-native-paper'

const Evaluation = ({ navigation }) => {
  const options = useSelector(state => state.formOptions.option)
  const lang = useSelector(state => state.formOptions.language)
  const dispatch = useDispatch()

  const changeMode = mode => {
    dispatch(setOption(mode))
  }

  const changeLanguage = language => {
    dispatch(setLanguage(language))
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <Text>Mode</Text>
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
          }}
        >
          <TouchableWithoutFeedback onPress={() => changeMode('Auto')}>
            <Text
              style={{
                padding: 10,
                borderRightWidth: 1,
                backgroundColor: options == 'Auto' ? 'black' : 'white',
                color: options == 'Auto' ? 'white' : 'black',
              }}
            >
              Auto
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeMode('Push')}>
            <Text
              style={{
                padding: 10,
                borderRightWidth: 1,
                backgroundColor: options == 'Push' ? 'black' : 'white',
                color: options == 'Push' ? 'white' : 'black',
              }}
            >
              Push to Talk
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeMode('Type')}>
            <Text
              style={{
                padding: 10,
                borderRightWidth: 1,
                backgroundColor: options == 'Type' ? 'black' : 'white',
                color: options == 'Type' ? 'white' : 'black',
              }}
            >
              Type to Answer
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <Text>Language</Text>
        <View
          style={{
            borderWidth: 1,
            flexDirection: 'row',
          }}
        >
          <TouchableWithoutFeedback onPress={() => changeLanguage('English')}>
            <Text
              style={{
                padding: 10,
                borderRightWidth: 1,
                backgroundColor: lang == 'English' ? 'black' : 'white',
                color: lang == 'English' ? 'white' : 'black',
              }}
            >
              English
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeLanguage('Tagalog')}>
            <Text
              style={{
                padding: 10,
                borderRightWidth: 1,
                backgroundColor: lang == 'Tagalog' ? 'black' : 'white',
                color: lang == 'Tagalog' ? 'white' : 'black',
              }}
            >
              Tagalog
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={{ marginVertical: 10 }}></View>
      <Button title="Start" onPress={() => navigation.navigate('Form')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 8,
  },
})

export default Evaluation
