import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateDialoge from '../../Components/Dialogue/CreateDialoge'
import {
  clearQuestions,
  deleteQuestion,
  resetQuestions,
  updateQuestions,
} from '../../States/Slice/questionsSlice'
import * as FileSystem from 'expo-file-system'
import { encode } from 'base64-arraybuffer'

import { Audio } from 'expo-av'

const Questions = () => {
  const dispatch = useDispatch()
  const questions = useSelector(state => state.questions.list)
  const [dialogueVisible, setDialogueVisible] = useState(false)
  const [status, setStatus] = useState('')
  console.log(questions)

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const generateAudios = async () => {
    try {
      if (Array.isArray(questions)) {
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

          await delay(1000)
        }

        console.log('Updated questions with audio:', updatedQuestions)
        dispatch(updateQuestions(updatedQuestions))
      } else {
        console.log('questions is not an array:', questions)
      }
    } catch (e) {
      console.log('Error generating audios:', e)
    }
  }

  const fetchAudio = async text => {
    setStatus('Generating audio...')

    try {
      const response = await fetch('http://192.168.1.47:5000/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text }),
      })

      if (!response.ok) throw new Error('Failed to fetch MP3')

      const fileData = await response.arrayBuffer()
      const base64 = encode(fileData)

      const sanitizeFilename = text => {
        return text.replace(/[^a-zA-Z0-9]/g, '_')
      }

      const path = `${FileSystem.cacheDirectory}${sanitizeFilename(text)}.mp3`
      await FileSystem.writeAsStringAsync(path, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })

      setStatus(`Audio saved at: ${path}`)
      return path
    } catch (error) {
      setStatus('Error: ' + error.message)
    }
  }

  const playAudiosSequentially = async () => {
    try {
      if (!Array.isArray(questions)) {
        console.log("Error: 'questions' is not an array", questions)
        return
      }

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i]

        if (question.audioEnglish) {
          console.log(`Playing English: ${question.audioEnglish}`)
          await playAudio(question.audioEnglish)
          await new Promise(resolve => setTimeout(resolve, 500))
        }

        if (question.audioTagalog) {
          console.log(`Playing Tagalog: ${question.audioTagalog}`)
          await playAudio(question.audioTagalog)
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
    } catch (error) {
      console.log('Error playing audios:', error)
    }
  }

  const playAudio = async path => {
    try {
      console.log(`Loading audio: ${path}`)
      const { sound } = await Audio.Sound.createAsync({ uri: path })
      await sound.playAsync()
      await new Promise(resolve => {
        sound.setOnPlaybackStatusUpdate(async status => {
          if (status.didJustFinish) {
            await sound.unloadAsync()
            resolve()
          }
        })
      })
    } catch (error) {
      console.log('Error playing audio:', error)
    }
  }

  // playAudio('file:///data/user/0/host.exp.exponent/cache/audio.mp3')

  return (
    <ScrollView>
      <View style={{ padding: 20, position: 'relative' }}>
        <View>
          <Text>Questions List:</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'gray',
            marginBottom: 20,
          }}
        ></View>
        <View>
          {questions.length > 0 ? (
            questions.map((item, i) => (
              <View
                style={{
                  backgroundColor: '#dedede',
                  borderRadius: 24,
                  padding: 20,
                  marginBottom: 10,
                }}
                key={i}
              >
                <Text style={{ fontWeight: 600 }}>
                  English ({item.audioEnglish === '' ? 'No audio' : 'Has Audio'}
                  )
                </Text>
                <Text style={{ marginVertical: 10 }}>{item.english}</Text>
                <Text style={{ fontWeight: 600 }}>
                  Tagalog ({item.audioTagalog === '' ? 'No audio' : 'Has Audio'}
                  )
                </Text>
                <Text style={{ marginVertical: 10 }}>{item.tagalog}</Text>
                <View style={{ position: 'absolute', right: 20, top: 20 }}>
                  <Text onPress={() => dispatch(deleteQuestion(i))}>
                    Delete
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No Questions Added.</Text>
          )}
          <View style={{ marginVertical: 10, gap: 10 }}>
            <Button title="Generate Audio" onPress={generateAudios} />
            <Button
              title="Create New"
              onPress={() => setDialogueVisible(true)}
            />
            <Button title="Clear" onPress={() => dispatch(clearQuestions())} />
          </View>
        </View>
        <CreateDialoge
          visible={dialogueVisible}
          onClose={() => setDialogueVisible(false)}
        />
        <Button title="Play Audio" onPress={playAudiosSequentially} />
        <View style={{ marginVertical: 10 }}>
          <Button
            title="Reset Questions"
            onPress={() => dispatch(resetQuestions())}
          />
        </View>
        <Text>{status}</Text>
      </View>
    </ScrollView>
  )
}

export default Questions
