import { useCallback, useRef, useState } from 'react'
import { useGetTextToSpeechMutation } from '../States/Api/ttsApi'
import { Audio } from 'expo-av'

const useEdgeTTSApi = () => {
  const [getTextToSpeech, { isLoading, isError, data }] =
    useGetTextToSpeechMutation()
  const audioRef = useRef(new Audio.Sound())
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const convertTextToSpeech = async (text, lang) => {
    try {
      const response = await getTextToSpeech({ text, lang }).unwrap()
      return response
    } catch (error) {
      console.error('Error converting text to speech:', error)
      throw error
    }
  }

  const play = async (text, lang) => {
    try {
      const audioUrl = await convertTextToSpeech(text, lang)
      await audioRef.current.unloadAsync()
      await audioRef.current.loadAsync({ uri: audioUrl })
      await audioRef.current.playAsync()
      setIsAudioPlaying(true)

      audioRef.current.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setIsAudioPlaying(false)
        }
      })
    } catch (error) {
      console.error('Error speaking text:', error)
    }
  }

  const stop = async () => {
    try {
      await audioRef.current.stopAsync()
      setIsAudioPlaying(false)
    } catch (error) {
      console.error('Error stopping audio:', error)
    }
  }

  const repeat = async () => {
    try {
      await audioRef.current.replayAsync()
    } catch (error) {
      console.error('Error repeating audio:', error)
    }
  }

  const isPlaying = useCallback(() => {
    return isAudioPlaying
  }, [isAudioPlaying])

  return {
    speak: {
      play,
      stop,
      repeat,
      isPlaying,
    },
    data,
    isError,
    isLoading,
    convertTextToSpeech,
  }
}

export default useEdgeTTSApi
