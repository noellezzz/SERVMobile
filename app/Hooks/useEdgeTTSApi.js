import { useCallback, useRef, useState } from 'react'
import { useGetTextToSpeechMutation } from '@/States/Api/ttsApi'
import { Audio } from 'expo-av'

const useEdgeTTSApi = () => {
  const [getTextToSpeech, { isLoading, isError, data }] =
    useGetTextToSpeechMutation()
  const audioRef = useRef(new Audio.Sound())
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentLang, setCurrentLang] = useState('')
  const [audioUrl, setAudioUrl] = useState(null)

  const convertTextToSpeech = async (text, lang) => {
    try {
      const response = await getTextToSpeech({ text, lang }).unwrap()
      setAudioUrl(response)
      return response
    } catch (error) {
      console.error('Error converting text to speech:', error)
      throw error
    }
  }

  const play = async (text, lang) => {
    try {
      // Save current text and language
      setCurrentText(text)
      setCurrentLang(lang)

      // Only get new audio URL if text or language changed
      let url = audioUrl
      if (!url || text !== currentText || lang !== currentLang) {
        url = await convertTextToSpeech(text, lang)
      }

      // Unload any existing audio
      await audioRef.current.unloadAsync().catch(() => { })

      // Load and play the audio
      const status = await audioRef.current.loadAsync({ uri: url }, { shouldPlay: true })

      if (status.isLoaded) {
        setIsAudioPlaying(true)

        audioRef.current.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            setIsAudioPlaying(false)
          }
        })
      } else {
        throw new Error('Failed to load audio')
      }
    } catch (error) {
      console.error('Error speaking text:', error)
      setIsAudioPlaying(false)
    }
  }

  const stop = async () => {
    try {
      const status = await audioRef.current.getStatusAsync()
      if (status.isLoaded) {
        await audioRef.current.stopAsync()
      }
      setIsAudioPlaying(false)
    } catch (error) {
      console.error('Error stopping audio:', error)
      setIsAudioPlaying(false)
    }
  }

  const repeat = async () => {
    try {
      if (currentText) {
        await play(currentText, currentLang)
      }
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