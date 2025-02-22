import { View, StyleSheet, Button, Text, TextInput, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import { ActivityIndicator } from 'react-native-paper'
import YesNoModal from '../../../Components/Dialogue/ConfirmationDialogue'
import generateAudios from '../../../Utils/generateAudios'
import CustomButton from '../../../Components/Buttons/CustomButton'
import wordmark from '../../../../assets/SERV-adm.png'
import AccordionItem from '../../../Components/Interactables/AccordionItem'
import Ionicons from '@expo/vector-icons/Ionicons'
import ModeSelector from '../../../Components/Interactables/ModeSelector'
import { setLanguage, setOption } from '../../../States/Slice/formOptionsSlice'
import Animated, { LinearTransition } from 'react-native-reanimated'

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

const accordionData = [
  { id: '1', title: 'How it works?', content: <View style={styles.box} /> },
  {
    id: '2',
    title: 'Push to Talk Guide',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
  {
    id: '3',
    title: 'Type To Answer Guide',
    content: <View style={[styles.box, { backgroundColor: '#dedede' }]} />,
  },
]

const Evaluation = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null)
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
  const [selectedMode, setSelectedMode] = useState('Auto')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const dispatch = useDispatch()

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
            await sound.unloadAsync()
            resolve()
          }
        })
      })
    } catch (error) {
      console.log('Error playing audio:', error)
    }
  }

  return !loading && start ? (
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
    </Animated.View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Image
        source={wordmark}
        style={{ width: 300, height: 100, resizeMode: 'contain' }}
      />

      <View style={{ width: '100%' }}>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 12,
            padding: 30,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>
              Evaluation Quick Guide
            </Text>
            <Text style={{ fontSize: 14 }}>
              Before we start, here are some frequently asked questions that
              will help guide you to have an optimized experience.
            </Text>
          </View>

          {accordionData.map((item, index) => (
            <View key={item.id} style={styles.accordionItem}>
              <CustomButton
                mode="outlined"
                title={item.title}
                onPress={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
              <AccordionItem isExpanded={activeIndex === index}>
                {item.content}
              </AccordionItem>
            </View>
          ))}

          <View style={{ marginVertical: 10 }}>
            {loading && (
              <>
                <ActivityIndicator />
              </>
            )}
            <Text>{loadingMessage}</Text>
          </View>
          <CustomButton
            title={
              isUnresolved ? 'Cannot Start. Missing Audio files' : 'Get Started'
            }
            onPress={() => handleStart()}
            disabled={isUnresolved}
          />
        </View>
      </View>

      <YesNoModal
        text="Audio files not found. Would you like to generate audio files?"
        visible={modalVisible}
        onYes={handleGenerate}
        onNo={() => setModalVisible(false)}
      />
    </View>
  )
}

export default Evaluation
