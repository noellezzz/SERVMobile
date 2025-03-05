import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLanguage, setOption } from '@/States/Slice/formOptionsSlice'
import wordmark from '@/../assets/SERV-adm.png'
import ModeSelector from '@/Components/Interactables/ModeSelector'
import CustomButton from '@/Components/Buttons/CustomButton'
import QRScanner from '@/Components/Scanner'

const Evaluation = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('Auto')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [showScanner, setShowScanner] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const dispatch = useDispatch()

  const handleModeChange = mode => {
    setSelectedMode(mode)
    dispatch(setOption(mode))
  }

  const handleLanguageChange = language => {
    setSelectedLanguage(language)
    dispatch(setLanguage(language))
  }

  const handleCodeScanned = (data) => {
    console.log('Scanned QR Code Data:', data)
    setScannedData(data)
    setShowScanner(false)
  }

  if (showScanner) {
    return (
      <View style={styles.scannerContainer}>
        <QRScanner onCodeScanned={handleCodeScanned} />
        <Pressable 
          style={styles.closeButton} 
          onPress={() => setShowScanner(false)}
        >
          <Text style={styles.closeButtonText}>Close Scanner</Text>
        </Pressable>
      </View>
    )
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
          
          {scannedData && (
            <View style={styles.scannedDataContainer}>
              <Text style={styles.scannedDataLabel}>Last Scanned Code:</Text>
              <Text style={styles.scannedDataText}>{scannedData}</Text>
            </View>
          )}
          
          <View style={{ marginVertical: 10 }}>
            <CustomButton
              title="Scan QR Code"
              onPress={() => setShowScanner(true)}
            />
          </View>
          
          <CustomButton
            title="Go to Form"
            onPress={() => navigation.navigate('Form')}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#691414',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scannedDataContainer: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#691414',
  },
  scannedDataLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  scannedDataText: {
    fontSize: 14,
  }
})

export default Evaluation