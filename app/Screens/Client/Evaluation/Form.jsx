import { View, StyleSheet, Button, Text, TextInput } from 'react-native'
import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import { ActivityIndicator } from 'react-native-paper'
import YesNoModal from '../../../Components/Dialogue/ConfirmationDialogue'
import generateAudios from '../../../Utils/generateAudios'

const Evaluation = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isUnresolved, setIsUnresolved] = useState(false)
  const options = useSelector(state => state.formOptions.option)
  const language = useSelector(state => state.formOptions.language)
  const questions = useSelector(state => state.questions.list)
  const [loading, setLoading] = useState(true)
  const [start, setStart] = useState(false)
  const [form, setForm] = useState([])
  const { generateAudioFiles } = generateAudios()

  useEffect(() => {
    if (Array.isArray(questions)) {
      questions.map(item => {
        if (
          item.audioEnglish === '' ||
          item.audioEnglish === undefined ||
          item.audioTagalog === '' ||
          item.audioTagalog === undefined
        ) {
          setModalVisible(true)
          setIsUnresolved(true)
        }
      })
    }
    loadQuestions()
    setLoading(false)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')

  const loadQuestions = async () => {
    const updatedForm = questions.map(q => ({
      ...q,
      answer: '',
    }))
    setForm(updatedForm)
  }

  const playCurrentQuestion = num => {
    if (language === 'English') {
      playAudio(form[currentIndex + num].audioEnglish)
    } else {
      playAudio(form[currentIndex + num].audioTagalog)
    }
  }

  const handleGenerate = async () => {
    setModalVisible(false)
    setLoading(true)
    setLoadingMessage('Generating Audios. Please wait...')
    await generateAudioFiles()
    setLoading(false)
    setIsUnresolved(false)
    await loadQuestions()
    setLoadingMessage('All set! Press "Start" to begin')
  }

  const handleStart = () => {
    setStart(true)
    playCurrentQuestion(0)
  }

  const handleNext = () => {
    setAnswer(form[currentIndex + 1].answer)
    handleUpdateForm()
    setCurrentIndex(prev => prev + 1)
    playCurrentQuestion(1)
  }

  const handlePrev = () => {
    setAnswer(form[currentIndex - 1].answer)
    handleUpdateForm()
    setCurrentIndex(prev => prev - 1)
    playCurrentQuestion(-1)
  }

  const handleUpdateForm = () => {
    setForm(prevForm =>
      prevForm.map((item, index) =>
        index === currentIndex ? { ...item, answer: answer } : item,
      ),
    )
  }

  const playAudio = async path => {
    try {
      console.log(`Loading audio: ${path}`)
      const { sound } = await Audio.Sound.createAsync({ uri: path })
      await sound.playAsync()
      await new Promise(resolve => {
        sound.setOnPlaybackStatusUpdate(async status => {
          if (status.didJustFinish) {
            await sound.unloadAsync() // Unload after playing
            resolve()
          }
        })
      })
    } catch (error) {
      console.log('Error playing audio:', error)
    }
  }

  return !loading && start ? (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 40, left: 10 }}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ textAlign: 'center', color: 'gray' }}>
          Question {currentIndex + 1} of {form.length}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          {language === 'English'
            ? form[currentIndex].english
            : form[currentIndex].tagalog}
        </Text>
      </View>
      {options === 'Type' && (
        <View style={{ borderWidth: 1, marginVertical: 10, height: 100 }}>
          <TextInput
            onChangeText={text => setAnswer(text)}
            value={answer}
            editable={options == 'Type'}
          />
        </View>
      )}

      <View style={{}}>
        <Button title="Talk" />
      </View>
      <View style={{ gap: 5, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Button
            title="Prev"
            disabled={currentIndex === 0}
            onPress={handlePrev}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Next"
            disabled={form.length === currentIndex + 1}
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginVertical: 10 }}>
        {loading && (
          <>
            <ActivityIndicator />
          </>
        )}
        <Text>{loadingMessage}</Text>
      </View>

      <Button
        title={isUnresolved ? 'Cannot Start. Missing Audio files' : 'Start'}
        onPress={() => handleStart()}
        disabled={isUnresolved}
      />

      <YesNoModal
        text="Audio files not found. Would you like to generate audio files?"
        visible={modalVisible}
        onYes={handleGenerate}
        onNo={() => setModalVisible(false)}
      />
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
