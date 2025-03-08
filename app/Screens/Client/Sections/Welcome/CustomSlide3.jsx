import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setEvalInfo } from '@/States/Slice/formOptionsSlice'
import HeroSection from '../HeroSection'
import QRScanner from '@/Components/Scanner'

const CustomSlide3 = ({ navigation, setAllowAutoNav }) => {
  const [showScanner, setShowScanner] = useState(true)
  const [scannedData, setScannedData] = useState(null)
  const dispatch = useDispatch()
  
  const {
    userId,
    employeeIds,
    serviceIds,
  } = useSelector(state => state.formOptions)
  
  useEffect(() => {
    if (setAllowAutoNav) {
      setAllowAutoNav(!showScanner);
    }
  }, [showScanner, setAllowAutoNav]);
  
  const handleCodeScanned = (data) => {
    console.log('Scanned QR Code Data:', data)
    setScannedData(data)
    
    // Process the scanned data (similar to handleEvaluationScan in Evaluation.jsx)
    if (data.startsWith('http')) {
      try {
        const url = new URL(data)
        const employeeIdsParam = url.searchParams.get('employeeIds')
        const serviceIdsParam = url.searchParams.get('serviceIds')
        const userIdParam = url.searchParams.get('userId')
        
        if (employeeIdsParam || serviceIdsParam) {
          // Process employee IDs
          let parsedEmployeeIds = []
          if (employeeIdsParam) {
            parsedEmployeeIds = employeeIdsParam
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(Boolean)
          }
          
          // Process service IDs
          let parsedServiceIds = []
          if (serviceIdsParam) {
            parsedServiceIds = serviceIdsParam
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(Boolean)
          }
          
          // Dispatch to Redux store
          dispatch(setEvalInfo({
            userId: userIdParam || '',
            employeeIds: parsedEmployeeIds,
            serviceIds: parsedServiceIds
          }))
          
          // Alert.alert('Success', 'Evaluation data loaded from QR code', [
          //   { 
          //     text: 'Go to Evaluation', 
          //     onPress: () => navigation.navigate('Evaluation') 
          //   }
          // ])
          navigation.navigate('Evaluation')
        } else {
          Alert.alert('Error', 'QR code does not contain valid evaluation parameters')
        }
      } catch (error) {
        console.error("Error processing URL from QR code:", error)
        Alert.alert('Error', 'Invalid URL in QR code')
      }
    } else {
      // Try to parse as JSON
      try {
        const evaluationData = JSON.parse(data)
        
        dispatch(setEvalInfo({
          userId: evaluationData.userId || '',
          employeeIds: evaluationData.employeeIds || [],
          serviceIds: evaluationData.serviceIds || []
        }))
        
        Alert.alert('Success', 'Evaluation data captured successfully', [
          { 
            text: 'Go to Evaluation', 
            onPress: () => navigation.navigate('Evaluation') 
          }
        ])
      } catch (error) {
        Alert.alert('Error', 'Failed to parse evaluation data from QR code')
      }
    }
    
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
            {/* <Text style={styles.scannedDataLabel}>QR Code Result:</Text>
            <Text style={styles.scannedDataText}>
              {typeof scannedData === 'string' && scannedData.length > 100 
                ? `${scannedData.substring(0, 100)}...` 
                : scannedData}
            </Text> */}
            <Pressable
              style={styles.goToEvaluationButton}
              onPress={() => navigation.navigate('Evaluation')}
            >
              <Text style={styles.buttonText}>Go to Evaluation</Text>
            </Pressable>
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
    marginBottom: 10,
  },
  goToEvaluationButton: {
    backgroundColor: '#691414',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  }
});

export default CustomSlide3