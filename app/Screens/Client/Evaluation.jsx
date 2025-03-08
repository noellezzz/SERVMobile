import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setOption, setEvalInfo, initializeState } from '@/States/Slice/formOptionsSlice'


import wordmark from '@/../assets/SERV-adm.png'
import ModeSelector from '@/Components/Interactables/ModeSelector'
import CustomButton from '@/Components/Buttons/CustomButton'
import QRScanner from '@/Components/Scanner'
import useResource from '@/Hooks/useResource'

const Evaluation = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeState());
  }, [dispatch]);

  const {
    userId: _userId,
    employeeIds,
    serviceIds,
  } = useSelector(state => state.formOptions)
  

  // Resources and API data
  const {
    actions: { fetchDatas: fetchServices },
    states: { data: services }
  } = useResource('services')

  const {
    actions: { fetchDatas: fetchEmployeeInfo },
    states: { data: employeeInfo }
  } = useResource('employee-info')

  // UI state
  const [selectedMode, setSelectedMode] = useState('Auto')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [showScanner, setShowScanner] = useState(false)
  const [scanMode, setScanMode] = useState(null) // 'userId' or 'evaluation'

  // Evaluation form data
  const [userId, setUserId] = useState(_userId)
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([])
  const [selectedServiceIds, setSelectedServiceIds] = useState([])

  // Dropdown state
  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false)
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false)

  // Handle mode and language changes
  const handleModeChange = mode => {
    setSelectedMode(mode)
    dispatch(setOption(mode))
  }

  const handleLanguageChange = language => {
    setSelectedLanguage(language)
    dispatch(setLanguage(language))
  }

  // QR Code scanning
  const handleStartScan = (mode) => {
    setScanMode(mode)
    setShowScanner(true)
  }

  const handleCodeScanned = (data) => {
    console.log('Scanned QR Code Data:', data)

    if (scanMode === 'userId') {
      handleUserIdScan(data)
    } else if (scanMode === 'evaluation') {
      handleEvaluationScan(data)
    }

    setShowScanner(false)
  }

  const handleUserIdScan = (data) => {
    if (data.startsWith('http')) {
      try {
        const url = new URL(data)
        const scannedUserId = url.searchParams.get('userId')
        if (scannedUserId) {
          setUserId(scannedUserId)
          Alert.alert('Success', 'User ID captured successfully')
        } else {
          Alert.alert('Error', 'No user ID found in the QR code')
        }
      } catch (error) {
        console.error("Error processing URL from QR code:", error)
        Alert.alert('Error', 'Invalid URL in QR code')
      }
    } else {
      setUserId(data)
      Alert.alert('Success', 'User ID captured successfully')
    }
  }

  const handleEvaluationScan = (data) => {
    // Check if the scanned data is a URL
    if (data.startsWith('http')) {
      try {
        const url = new URL(data)
        const employeeIdsParam = url.searchParams.get('employeeIds')
        const serviceIdsParam = url.searchParams.get('serviceIds')
        const userIdParam = url.searchParams.get('userId')

        if (employeeIdsParam || serviceIdsParam) {
          // Process employee IDs
          if (employeeIdsParam) {
            const employeeIds = employeeIdsParam
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(Boolean)

            setSelectedEmployeeIds(prevIds => {
              // Create a new array with unique values
              return [...new Set([...prevIds, ...employeeIds])]
            })

            // Auto-select services for these employees
            updateServicesBasedOnEmployees(employeeIds)
          }

          // Process service IDs
          if (serviceIdsParam) {
            const serviceIds = serviceIdsParam
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(Boolean)

            setSelectedServiceIds(prevIds => {
              // Create a new array with unique values
              return [...new Set([...prevIds, ...serviceIds])]
            })
          }

          // Process user ID if present
          if (userIdParam) {
            setUserId(userIdParam)
          }

          Alert.alert('Success', 'Evaluation data loaded from QR code')
        } else {
          Alert.alert('Error', 'QR code does not contain valid evaluation parameters: ' + data)
        }
      } catch (error) {
        console.error("Error processing URL from QR code:", error)
        Alert.alert('Error', 'Invalid URL in QR code')
      }
    } else {
      // Try to parse as JSON
      try {
        const evaluationData = JSON.parse(data)

        if (evaluationData.employeeIds) {
          setSelectedEmployeeIds(prevIds => {
            return [...new Set([...prevIds, ...evaluationData.employeeIds])]
          })

          // Auto-select services
          updateServicesBasedOnEmployees(evaluationData.employeeIds)
        }

        if (evaluationData.serviceIds) {
          setSelectedServiceIds(prevIds => {
            return [...new Set([...prevIds, ...evaluationData.serviceIds])]
          })
        }

        Alert.alert('Success', 'Evaluation data captured successfully')
      } catch (error) {
        Alert.alert('Error', 'Failed to parse evaluation data from QR code')
      }
    }
  }

  // Update services based on selected employees
  const updateServicesBasedOnEmployees = (employeeIds) => {
    if (!employeeInfo || !employeeIds) return

    // Collect all service IDs from the selected employees
    const selectedEmployeeServices = []

    employeeIds.forEach(empId => {
      const employee = employeeInfo.find(emp => emp.id === empId)
      if (employee && employee.services) {
        employee.services.forEach(service => {
          if (!selectedEmployeeServices.includes(service.id)) {
            selectedEmployeeServices.push(service.id)
          }
        })
      }
    })

    // Update the services selection with unique values
    setSelectedServiceIds(prevIds => {
      return [...new Set([...prevIds, ...selectedEmployeeServices])]
    })
  }

  // Toggle employee selection
  const toggleEmployeeSelection = (empId) => {
    setSelectedEmployeeIds(prevIds => {
      // If employee already selected, remove it
      if (prevIds.includes(empId)) {
        return prevIds.filter(id => id !== empId)
      }
      // Otherwise add it
      return [...prevIds, empId]
    })

    // If adding an employee, also add their services
    if (!selectedEmployeeIds.includes(empId)) {
      const employee = employeeInfo.find(emp => emp.id === empId)
      if (employee && employee.services) {
        const serviceIds = employee.services.map(service => service.id)
        setSelectedServiceIds(prevIds => {
          return [...new Set([...prevIds, ...serviceIds])]
        })
      }
    }
  }

  // Toggle service selection
  const toggleServiceSelection = (serviceId) => {
    setSelectedServiceIds(prevIds => {
      // If service already selected, remove it
      if (prevIds.includes(serviceId)) {
        return prevIds.filter(id => id !== serviceId)
      }
      // Otherwise add it
      return [...prevIds, serviceId]
    })
  }

  // Helper function to get employee names
  const getSelectedEmployeeText = () => {
    if (selectedEmployeeIds.length === 0) {
      return "Select Employees"
    }

    const selectedEmployees = (employeeInfo || [])
      .filter(emp => selectedEmployeeIds.includes(emp.id))
      .map(emp => `${emp.user.first_name} ${emp.user.last_name || emp.user.username}`)

    return selectedEmployees.length > 1
      ? `${selectedEmployees[0]} + ${selectedEmployees.length - 1} more`
      : selectedEmployees[0] || "Select Employees"
  }

  // Helper function to get service names
  const getSelectedServiceText = () => {
    if (selectedServiceIds.length === 0) {
      return "Select Services"
    }

    const selectedServices = (services || [])
      .filter(service => selectedServiceIds.includes(service.id))
      .map(service => service.name)

    return selectedServices.length > 1
      ? `${selectedServices[0]} + ${selectedServices.length - 1} more`
      : selectedServices[0] || "Select Services"
  }

  // Check if a service is associated with any selected employee
  const isServiceFromSelectedEmployee = (serviceId) => {
    if (!employeeInfo || selectedEmployeeIds.length === 0) return false

    for (const empId of selectedEmployeeIds) {
      const employee = employeeInfo.find(emp => emp.id === empId)
      if (employee && employee.services) {
        if (employee.services.some(service => service.id === serviceId)) {
          return true
        }
      }
    }

    return false
  }

  // Generate evaluation data URL for sharing
  const generateEvaluationUrl = () => {
    if (selectedEmployeeIds.length === 0) {
      Alert.alert('Error', 'Please select at least one employee')
      return
    }

    const baseUrl = "http://example.com/evaluation" // Replace with your actual base URL
    const empParam = selectedEmployeeIds.join(',')
    const svcParam = selectedServiceIds.join(',')
    const userParam = userId || ''

    let url = `${baseUrl}?employeeIds=${empParam}&serviceIds=${svcParam}`
    if (userParam) {
      url += `&userId=${userParam}`
    }

    Alert.alert(
      'Evaluation URL',
      `${url}`,
      [
        { text: 'OK' }
      ]
    )

    return url
  }

  // Validate form before proceeding
  const handleGoToForm = () => {
    if (!userId) {
      Alert.alert('Error', 'Please enter your ID')
      return
    }

    if (selectedEmployeeIds.length === 0) {
      Alert.alert('Error', 'Please select at least one employee')
      return
    }

    if (selectedServiceIds.length === 0) {
      Alert.alert('Error', 'Please select at least one service')
      return
    }

    // All validations passed, proceed to form
    navigation.navigate('Form', {
      userId,
      employeeIds: selectedEmployeeIds,
      serviceIds: selectedServiceIds
    })
  }

  // Initial data fetch
  useEffect(() => {
    fetchServices()
    fetchEmployeeInfo()
  }, [])
  
  useEffect(() => {
    if (employeeIds && employeeIds.length > 0) {
      setSelectedEmployeeIds(prev => [...new Set([...prev, ...employeeIds])])
    }

    if (serviceIds && serviceIds.length > 0) {
      setSelectedServiceIds(prev => [...new Set([...prev, ...serviceIds])])
    }

  }, [employeeIds, serviceIds]);

  // QR Scanner view
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

  // Main view
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={wordmark}
          style={styles.logo}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.headerText}>Service Evaluation</Text>
        <Text style={styles.subheaderText}>Please complete the form to begin</Text>

        {/* User ID Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your ID</Text>
          <Text style={styles.sectionSubtitle}>Enter the last four digits of your ID</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={userId}
              onChangeText={setUserId}
              placeholder="Enter your ID"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => handleStartScan('userId')}
            >
              <Ionicons name="qr-code" size={20} color="white" />
              <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Employee Selection Dropdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employee Selection</Text>
          <Text style={styles.sectionSubtitle}>Select employees to evaluate (services auto-selected)</Text>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setEmployeeDropdownVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {getSelectedEmployeeText()}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#333"
            />
          </TouchableOpacity>

          <Modal
            visible={employeeDropdownVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Employees</Text>
                  <TouchableOpacity onPress={() => setEmployeeDropdownVisible(false)}>
                    <Ionicons name="close" size={24} color="#691414" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.dropdownList}>
                  {(employeeInfo || []).length === 0 ? (
                    <Text style={styles.emptyListText}>No employees found</Text>
                  ) : (
                    (employeeInfo || []).map((emp) => (
                      <TouchableOpacity
                        key={emp.id}
                        style={styles.dropdownItem}
                        onPress={() => toggleEmployeeSelection(emp.id)}
                      >
                        <View style={[
                          styles.checkbox,
                          selectedEmployeeIds.includes(emp.id) && styles.checkboxSelected
                        ]}>
                          {selectedEmployeeIds.includes(emp.id) && (
                            <Ionicons name="checkmark" size={16} color="white" />
                          )}
                        </View>
                        <View style={styles.dropdownItemTextContainer}>
                          <Text style={styles.dropdownItemText}>
                            {emp?.user.first_name + ' ' + emp?.user.last_name || emp?.user.username}
                          </Text>
                          {emp?.services && emp.services.length > 0 && (
                            <Text style={styles.dropdownItemSubtext}>
                              ({emp.services.length} services)
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setEmployeeDropdownVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Service Selection Dropdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Selection</Text>
          <Text style={styles.sectionSubtitle}>Services are auto-selected based on employees</Text>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setServiceDropdownVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {getSelectedServiceText()}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="#333"
            />
          </TouchableOpacity>

          <Modal
            visible={serviceDropdownVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Services</Text>
                  <TouchableOpacity onPress={() => setServiceDropdownVisible(false)}>
                    <Ionicons name="close" size={24} color="#691414" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.dropdownList}>
                  {(services || []).length === 0 ? (
                    <Text style={styles.emptyListText}>No services found</Text>
                  ) : (
                    (services || []).map((service) => (
                      <TouchableOpacity
                        key={service.id}
                        style={[
                          styles.dropdownItem,
                          isServiceFromSelectedEmployee(service.id) && styles.autoSelectedItem
                        ]}
                        onPress={() => toggleServiceSelection(service.id)}
                      >
                        <View style={[
                          styles.checkbox,
                          selectedServiceIds.includes(service.id) && styles.checkboxSelected
                        ]}>
                          {selectedServiceIds.includes(service.id) && (
                            <Ionicons name="checkmark" size={16} color="white" />
                          )}
                        </View>
                        <View style={styles.dropdownItemTextContainer}>
                          <Text style={styles.dropdownItemText}>{service.name}</Text>
                          {isServiceFromSelectedEmployee(service.id) && (
                            <Text style={styles.autoSelectedText}>(Auto-selected)</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setServiceDropdownVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {/* Mode and Language Selection */}
        <View style={styles.section}>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Mode</Text>
            <ModeSelector
              options={['Auto', 'Push to Talk', 'Type to Answer']}
              selectedOption={selectedMode}
              changeMode={handleModeChange}
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Language</Text>
            <ModeSelector
              options={['English', 'Tagalog']}
              selectedOption={selectedLanguage}
              changeMode={handleLanguageChange}
            />
          </View>
        </View>

        {/* Start Evaluation */}
        <CustomButton
          title="Start Evaluation"
          onPress={handleGoToForm}
          style={styles.startButton}
        />
        
        {/* QR Code Scan and Generate URL */}
        <View style={styles.buttonSection}>
          <CustomButton
            title="Scan Evaluation QR"
            onPress={() => handleStartScan('evaluation')}
          />

          {selectedEmployeeIds.length > 0 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={generateEvaluationUrl}
            >
              <Text style={styles.secondaryButtonText}>Generate QR Link</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#691414',
    textAlign: 'center',
    marginBottom: 5,
  },
  subheaderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
  },
  scanButton: {
    backgroundColor: '#691414',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
  },
  scanButtonText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '500',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dropdownButtonText: {
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#691414',
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  autoSelectedItem: {
    backgroundColor: '#f9f9f9',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#757575',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#691414',
    borderColor: '#691414',
  },
  dropdownItemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  autoSelectedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4caf50',
    marginLeft: 6,
  },
  emptyListText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#691414',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSection: {
    marginVertical: 20,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  startButton: {
    marginTop: 10,
  },
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
})

export default Evaluation