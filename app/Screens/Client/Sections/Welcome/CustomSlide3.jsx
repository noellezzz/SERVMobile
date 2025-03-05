import React, { useState } from 'react'
import { View, Text, Image, Button, StyleSheet, Pressable } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import HeroSection from '../../../Client/Sections/HeroSection'
import ContainerTile from '../../../../Components/Card/ContainerTile'
import WordMark from '../../../../../assets/SERV-adm.png'
import Logo from '../../../../../assets/SERV_Logo.png'
import QRScanner from '../../../../Components/Scanner'

const CustomSlide3 = ({ navigation, setAllowAutoNav }) => {
  const [showScanner, setShowScanner] = useState(false)
  const [scannedData, setScannedData] = useState(null)

  // Disable auto navigation when scanner is shown (if provided)
  React.useEffect(() => {
    if (setAllowAutoNav) {
      setAllowAutoNav(!showScanner);
    }
  }, [showScanner, setAllowAutoNav]);

  const handleCodeScanned = (data) => {
    console.log('Scanned QR Code Data:', data)
    setScannedData(data)
    setShowScanner(false)
  }

  const navigateToEvaluation = () => {
    navigation.replace('ClientStack')
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
    <View style={{ backgroundColor: '#691414', flex: 1 }}>
      <View
        style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
      >
        <HeroSection />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={navigateToEvaluation}
          style={styles.startButton}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 50,
              fontWeight: '800',
            }}
          >
            LET'S START
          </Text>
        </Pressable>

        {scannedData && (
          <View style={styles.scannedDataContainer}>
            <Text style={styles.scannedDataLabel}>QR Code Result:</Text>
            <Text style={styles.scannedDataText}>{scannedData}</Text>
          </View>
        )}

        <Pressable 
          style={styles.scanButton}
          onPress={() => setShowScanner(true)}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </Pressable>
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
  startButton: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transform: [{ scale: 1 }],
  },
  scanButton: {
    backgroundColor: '#0E7AFE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scannedDataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
  },
  scannedDataLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  scannedDataText: {
    fontSize: 14,
  }
});

export default CustomSlide3