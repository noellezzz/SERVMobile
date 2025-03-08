import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { initializeState } from '@/States/Slice/formOptionsSlice';

const Evaluation = () => {
  const dispatch = useDispatch();
  
  // Load persisted state on component mount
  useEffect(() => {
    dispatch(initializeState());
  }, [dispatch]);
  
  // Access the scanned data from Redux store
  const { 
    userId,
    employeeIds, 
    serviceIds 
  } = useSelector(state => state.formOptions);
  
  // Use the Redux state as initial values
  const [employees, setEmployees] = useState(employeeIds || []);
  const [services, setServices] = useState(serviceIds || []);
  
  // This useEffect will update local state when Redux state changes
  useEffect(() => {
    setEmployees(employeeIds || []);
    setServices(serviceIds || []);
  }, [employeeIds, serviceIds]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluation Form</Text>
      
      {userId && (
        <Text style={styles.infoText}>User ID: {userId}</Text>
      )}
      
      <Text style={styles.sectionTitle}>Employees to Evaluate:</Text>
      {employees.length > 0 ? (
        employees.map((employeeId, index) => (
          <Text key={index} style={styles.item}>Employee ID: {employeeId}</Text>
        ))
      ) : (
        <Text style={styles.emptyText}>No employees selected</Text>
      )}
      
      <Text style={styles.sectionTitle}>Services to Evaluate:</Text>
      {services.length > 0 ? (
        services.map((serviceId, index) => (
          <Text key={index} style={styles.item}>Service ID: {serviceId}</Text>
        ))
      ) : (
        <Text style={styles.emptyText}>No services selected</Text>
      )}
      
      {/* Rest of your evaluation form */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#691414'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  item: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 5
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#888'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default Evaluation;
