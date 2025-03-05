import { View, Text, Image } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLanguage, setOption } from '@/States/Slice/formOptionsSlice'
import wordmark from '@/../assets/SERV-adm.png'
import ModeSelector from '@/Components/Interactables/ModeSelector'
import CustomButton from '@/Components/Buttons/CustomButton'

const Evaluation = ({ navigation }) => {
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
      }}
    >
      <View>
        <Image
          source={wordmark}
          style={{ width: 300, height: 100, resizeMode: 'contain' }}
        />
      </View>

      <View>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 5,
            padding: 20,
            paddingVertical: 80,
            borderRadius: 12,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Mode</Text>
            <ModeSelector
              options={['Auto', 'Push to Talk', 'Type to Answer']}
              selectedOption={selectedMode}
              changeMode={handleModeChange}
            />
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
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Language</Text>
            <ModeSelector
              options={['English', 'Tagalog']}
              selectedOption={selectedLanguage}
              changeMode={handleLanguageChange}
            />
          </View>
          <View style={{ marginVertical: 10 }}></View>
          <CustomButton
            title="Go to Form"
            onPress={() => navigation.navigate('Form')}
          />
        </View>
      </View>
    </View>
  )
}

export default Evaluation
