import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuestions } from '../States/Slice/questionsSlice'
import * as FileSystem from 'expo-file-system'
import { encode } from 'base64-arraybuffer'

const generateAudios = () => {
  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions.list)
  const [status, setStatus] = useState('')

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const fetchAudio = async text => {
    setStatus('Generating audio...')

    try {
      const response = await fetch('http://192.168.1.33:5000/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error('Failed to fetch MP3')

      // Convert response to base64
      const fileData = await response.arrayBuffer()
      const base64 = encode(fileData)

      // Save to Expo's cache directory
      const sanitizeFilename = text => text.replace(/[^a-zA-Z0-9]/g, '_')

      const path = `${FileSystem.cacheDirectory}${sanitizeFilename(text)}.mp3`
      await FileSystem.writeAsStringAsync(path, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })

      setStatus(`Audio saved at: ${path}`)
      return path
    } catch (error) {
      setStatus('Error: ' + error.message)
      return ''
    }
  }

  const generateAudioFiles = async () => {
    try {
      if (!Array.isArray(questions)) {
        console.log('questions is not an array:', questions)
        return
      }

      const updatedQuestions = []

      for (const element of questions) {
        console.log(
          'Generating audio for:',
          element.english,
          '-',
          element.tagalog,
        )

        const englishAudioPath = await fetchAudio(element.english)
        const tagalogAudioPath = await fetchAudio(element.tagalog)

        updatedQuestions.push({
          ...element,
          audioEnglish: englishAudioPath,
          audioTagalog: tagalogAudioPath,
        })

        await delay(1000) // 1-second delay
      }

      console.log('Updated questions with audio:', updatedQuestions)
      dispatch(updateQuestions(updatedQuestions))
    } catch (e) {
      console.log('Error generating audios:', e)
    }
  }

  return { generateAudioFiles, status }
}

export default generateAudios
