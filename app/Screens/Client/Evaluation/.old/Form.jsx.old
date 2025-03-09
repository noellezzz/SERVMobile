import { View, StyleSheet, Button, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import Voice from '@wdragon/react-native-voice'
import generateAudios from '@/Utils/generateAudios'
import CustomButton from '@/Components/Buttons/CustomButton'
import wordmark from '@/../assets/SERV-adm.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import ModeSelector from '@/Components/Interactables/ModeSelector'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { setLanguage, setOption } from '@/States/Slice/formOptionsSlice'
import useEdgeTTSApi from '@/Hooks/useEdgeTTSApi'
import useResource from '@/Hooks/useResource'

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
  micButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  micButtonActive: {
    backgroundColor: '#ff4500',
  },
  micButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  answerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
})

const Evaluation = ({ navigation }) => {
  const _questions = useSelector(state => state.questions.list)
  const {
    language,
    options,
    userId,
    employeeIds,
    serviceIds,
  } = useSelector(state => state.formOptions)
  const dispatch = useDispatch()
  const { generateAudioFiles } = generateAudios()
  const { speak, isLoading, isError } = useEdgeTTSApi()
  const {
    actions: {
      fetchDatas,
    },
    states: {
      data,
      loading: testLoading
    }
  } = useResource('tests');
  const {
    actions: {
      doStore
    },
  } = useResource('results');
  
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [isUnresolved, setIsUnresolved] = useState(false)
  const [start, setStart] = useState(true)
  const [loading, setLoading] = useState(testLoading)
  const [form, setForm] = useState([])
  const [selectedMode, setSelectedMode] = useState(options)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [speechError, setSpeechError] = useState(null)
  
  // Speech recognition states
  const [isRecording, setIsRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  /**
   * VOICE RECOGNITION SETUP AND HANDLERS
   */
  useEffect(() => {
    // Set up voice recognition event handlers
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    // Request permissions on mount
    checkVoicePermissions();

    // Cleanup function
    return () => {
      destroyVoiceRecognizer();
    };
  }, []);

  const checkVoicePermissions = async () => {
    try {
      const isAvailable = await Voice.isAvailable();
      if (!isAvailable) {
        Alert.alert('Error', 'Voice recognition is not available on this device');
        return;
      }
      
      const hasPermission = await Voice.hasPermission();
      setHasPermission(hasPermission);
      
      if (!hasPermission) {
        requestVoicePermission();
      }
    } catch (error) {
      console.error('Error checking voice recognition availability:', error);
    }
  };

  const requestVoicePermission = async () => {
    try {
      const granted = await Voice.requestPermission();
      setHasPermission(granted);
      if (!granted) {
        Alert.alert('Permission required', 'Microphone permission is needed for speech recognition');
      }
    } catch (error) {
      console.error('Error requesting voice recognition permission:', error);
      Alert.alert('Error', 'Failed to request microphone permission');
    }
  };

  const onSpeechStartHandler = (e) => {
    console.log('Speech recognition started');
    setIsRecording(true);
  };

  const onSpeechEndHandler = (e) => {
    console.log('Speech recognition ended');
    setIsRecording(false);
  };

  const onSpeechResultsHandler = (e) => {
    if (e.value && e.value.length > 0) {
      const recognizedText = e.value[0];
      setAnswer(recognizedText);
    }
  };

  const onSpeechErrorHandler = (e) => {
    console.error('Speech recognition error:', e);
    setIsRecording(false);
    setSpeechError(`Recognition error: ${e.error ? e.error : 'Unknown error'}`);
  };

  const startSpeechRecognition = async () => {
    try {
      if (!hasPermission) {
        await requestVoicePermission();
        if (!hasPermission) return;
      }

      if (isRecording) {
        return;
      }

      // Clear any previous errors
      setSpeechError(null);

      // Stop any ongoing recognition
      await stopSpeechRecognition();

      // Set language based on the selected language
      const speechLanguage = selectedLanguage === 'English' ? 'en-US' : 'fil-PH';
      
      // Start the voice recognition
      await Voice.start(speechLanguage);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      Alert.alert('Error', 'Failed to start speech recognition');
      setIsRecording(false);
    }
  };

  const stopSpeechRecognition = async () => {
    if (isRecording) {
      try {
        await Voice.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  const destroyVoiceRecognizer = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
      }
      await Voice.destroy();
    } catch (error) {
      console.error('Error destroying voice recognizer:', error);
    }
  };

  const handleMicPress = async () => {
    if (isRecording) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  /**
   *  HANDLERS 
   */
  const loadQuestions = async (data) => {
    const updatedForm = data.map(q => ({
      id: q?.id,
      english: q?.question_text_en,
      tagalog: q?.question_text_tl,
      category: q?.category,
      options: q?.options || [],
      audioEnglish: '',
      audioTagalog: '',
      answer: '',
      created: q?.created,
      last_updated: q?.last_updated,
      ...data,
    }))
    setForm(updatedForm)
    playCurrentQuestion()
  }
  const playCurrentQuestion = async (num = 0) => {
    if (!form || form.length === 0 || !form[currentIndex + num]) {
      return;
    }
    try {
      setSpeechError(null);
      const currentQuestion = form[currentIndex + num]
      const text =
        language === 'English' ? currentQuestion?.english : currentQuestion?.tagalog
      if (!text || typeof text !== 'string') {
        console.warn('Invalid text for speech synthesis:', text);
        return;
      }
      const lang = language === 'English' ? 'en' : 'tl'
      await speak.play(text, lang)
    } catch (error) {
      console.error('Error speaking text:', error);
      setSpeechError(`Failed to speak text. ${error.message}`);
      // Fallback to using the built-in Audio player if available
      if (form[currentIndex + num]) {
        const audioPath = language === 'English'
          ? form[currentIndex + num].audioEnglish
          : form[currentIndex + num].audioTagalog;
        if (audioPath) {
          playAudio(audioPath).catch(err =>
            console.error('Fallback audio playback failed:', err)
          );
        }
      }
    }
  }
  const handleModeChange = mode => {
    setSelectedMode(prev => mode)
    dispatch(setOption(mode))
  }
  const handleLanguageChange = language => {
    setSelectedLanguage(prev => language)
    dispatch(setLanguage(language))
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
    setAnswer(form[currentIndex + 1]?.answer || '')
    handleUpdateForm()
    setCurrentIndex(prev => prev + 1)
    playCurrentQuestion(1)
  }
  const handlePrev = () => {
    setAnswer(form[currentIndex - 1]?.answer || '')
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
  const handleDone = () => {
    handleUpdateForm() // Save current answer before submitting
    const payload = {
      user_info: {
        userId,
        employeeIds, 
        serviceIds
      },
      evaluation: form,
      multiple: true,
      is_new_feedback: true,
    }
    doStore(payload).then(() => {
      navigation.goBack();
    });
  };
  const handleGoBack = () => {
    speak.stop()
    if (isRecording) {
      stopSpeechRecognition()
    }
    navigation.goBack()
  }
  /**
   *  EFFECTS
   */

  // if the component unmounts, stop the any audio
  useEffect(() => {
    return () => {
      Audio.setAudioModeAsync({ staysActiveInBackground: false })
    }
  }, [])
  useEffect(() => {
    fetchDatas();
  }, [])
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      loadQuestions(data);
    } else {
      loadQuestions(_questions);
    }
  }, [data])
  useEffect(() => {
    playCurrentQuestion()
  }, [language, selectedMode])
  useEffect(() => {
    if (Array.isArray(form) && form.length > 0) {
      form.forEach(item => {
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
    setLoading(false)
  }, [form])
  
  // Save answer when entering a new one
  useEffect(() => {
    if (!isRecording) {
      handleUpdateForm()
    }
  }, [answer])

  return (
    !loading && (
      <Animated.View layout={LinearTransition} style={styles.container}>
        <View style={{ position: 'absolute', top: 40, left: 10, width: 100 }}>
          <CustomButton title="Back" onPress={handleGoBack} />
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
              {form.length > 0 && (
                language === 'English'
                  ? form[currentIndex]?.english
                  : form[currentIndex]?.tagalog
              )}
            </Text>
            
            <TextInput
              style={styles.answerBox}
              onChangeText={text => setAnswer(text)}
              value={answer}
              placeholder="Your answer will appear here..."
              multiline
              editable={selectedMode === 'Type to Answer'}
            />
            
            <View style={{ marginVertical: 20, gap: 10, marginTop: 20 }}>
              {selectedMode !== 'Type to Answer' && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.micButton,
                      isRecording && styles.micButtonActive
                    ]}
                    onLongPress={startSpeechRecognition}
                    onPressOut={stopSpeechRecognition}
                    delayLongPress={200}
                  >
                    <Ionicons name="mic" size={24} color="white" />
                    <Text style={styles.micButtonText}>
                      {isRecording ? 'Recording...' : 'Press and hold to talk'}
                    </Text>
                  </TouchableOpacity>
                  
                  {isRecording && (
                    <View style={styles.recordingIndicator}>
                      <View style={styles.recordingDot} />
                      <Text style={{ color: 'red' }}>Recording voice input</Text>
                    </View>
                  )}
                </>
              )}
              
              {selectedMode === 'Type to Answer' && (
                <CustomButton
                  title="Save Answer"
                  onPress={handleUpdateForm}
                />
              )}
              
              <View style={{ gap: 5, flexDirection: 'row', marginTop: 10 }}>
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
                    title={currentIndex === form.length - 1 ? 'Finish' : 'Next'}
                    onPress={
                      currentIndex === form.length - 1 ? handleDone : handleNext
                    }
                  />
                </View>
              </View>
            </View>
            {speechError && (
              <View style={{ marginTop: 10, padding: 8, backgroundColor: '#ffdddd', borderRadius: 5 }}>
                <Text style={{ color: 'red' }}>{speechError}</Text>
                <CustomButton
                  mode="outlined"
                  title="Retry Speech"
                  onPress={() => playCurrentQuestion(0)}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}
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