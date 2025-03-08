import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import useEdgeTTSApi from '@/Hooks/useEdgeTTSApi'

const TextToSpeechComponent = () => {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('en')
  const { speak, isLoading, isError } = useEdgeTTSApi()

  const handlePlay = () => {
    speak.play(text, lang)
  }

  const handleStop = () => {
    speak.stop()
  }

  const handleRepeat = () => {
    speak.repeat()
  }

  return (
    <View>
      <TextInput placeholder="Enter text" value={text} onChangeText={setText} />
      <TextInput
        placeholder="Enter language"
        value={lang}
        onChangeText={setLang}
      />
      <Button title="Play" onPress={handlePlay} disabled={isLoading} />
      <Button title="Stop" onPress={handleStop} disabled={!speak.isPlaying()} />
      <Button
        title="Repeat"
        onPress={handleRepeat}
        disabled={isLoading || !text}
      />
      {isError && <Text>Error occurred while converting text to speech</Text>}
    </View>
  )
}

export default TextToSpeechComponent
