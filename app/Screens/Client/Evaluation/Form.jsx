import { View, StyleSheet, Button, Text, TextInput, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import generateAudios from '../../../Utils/generateAudios'
import CustomButton from '../../../Components/Buttons/CustomButton'
import wordmark from '../../../../assets/SERV-adm.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import ModeSelector from '../../../Components/Interactables/ModeSelector'
import { setLanguage, setOption } from '../../../States/Slice/formOptionsSlice'
import Animated, { LinearTransition } from 'react-native-reanimated'
import useEdgeTTSApi from '../../../Hooks/useEdgeTTSApi'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 8,
  },
  accordionItem: {
    marginBottom: 10,
  },
  box: {
    height: 120,
    width: '100%',
    backgroundColor: '#dedede',
    borderRadius: 10,
    marginVertical: 10,
  },
})

const Evaluation = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isUnresolved, setIsUnresolved] = useState(false)
  const options = useSelector(state => state.formOptions.option)
  const language = useSelector(state => state.formOptions.language)
  const questions = useSelector(state => state.questions.list)
  const [loading, setLoading] = useState(true)
  const [start, setStart] = useState(true)
  const [form, setForm] = useState([])
  const { generateAudioFiles } = generateAudios()
  const [selectedMode, setSelectedMode] = useState(options)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const dispatch = useDispatch()
  const { speak, isLoading, isError } = useEdgeTTSApi()

  const handleModeChange = mode => {
    setSelectedMode(mode)
    dispatch(setOption(mode))
  }

  const handleLanguageChange = language => {
    setSelectedLanguage(language)
    dispatch(setLanguage(language))
  }

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

  const playCurrentQuestion = async num => {
    const currentQuestion = form[currentIndex + num]
    const text =
      language === 'English' ? currentQuestion.english : currentQuestion.tagalog
    const lang = language === 'English' ? 'en' : 'tl'
    await speak.play(text, lang)
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
            await sound.unloadAsync()
            resolve()
          }
        })
      })
    } catch (error) {
      console.log('Error playing audio:', error)
    }
  }

  return (
    !loading && (
      <Animated.View layout={LinearTransition} style={styles.container}>
        <View style={{ position: 'absolute', top: 40, left: 10, width: 100 }}>
          <CustomButton title="Back" onPress={() => navigation.goBack()} />
        </View>
        <Image
          source={wordmark}
          style={{ width: 300, height: 100, resizeMode: 'contain' }}
        />
        <View style={{ marginVertical: 20, width: '100%' }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              padding: 20,
              paddingVertical: 40,
              borderRadius: 12,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'gray' }}>
              Question {currentIndex + 1} of {form.length}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {language === 'English'
                ? form[currentIndex].english
                : form[currentIndex].tagalog}
            </Text>
            {options == 'Type to Answer' && (
              <View style={{ borderWidth: 1, marginVertical: 10, height: 100 }}>
                <TextInput
                  onChangeText={text => setAnswer(text)}
                  value={answer}
                  editable={options == 'Type'}
                />
              </View>
            )}

            <View style={{ marginVertical: 20, gap: 10, marginTop: 20 }}>
              <CustomButton
                title={options == 'Type to Answer' ? 'Enter' : 'Talk'}
                icon={() => {
                  options == 'Type to Answer' ? null : (
                    <Ionicons name="mic" size={24} color="white" />
                  )
                }}
              />

              <View style={{ gap: 5, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <CustomButton
                    mode="outlined"
                    title="Prev"
                    disabled={currentIndex === 0}
                    onPress={handlePrev}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomButton
                    mode="outlined"
                    title="Next"
                    disabled={form.length === currentIndex + 1}
                    onPress={handleNext}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <ModeSelector
              options={['Auto', 'Push to Talk', 'Type to Answer']}
              selectedOption={selectedMode}
              changeMode={handleModeChange}
            />
            <ModeSelector
              options={['English', 'Tagalog']}
              selectedOption={selectedLanguage}
              changeMode={handleLanguageChange}
            />
          </View>
        </View>
        {isError && <Text>Error occurred while converting text to speech</Text>}
      </Animated.View>
    )
  )
}

export default Evaluation
