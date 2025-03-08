import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StartPage from './StartPage';
import Questions from './Questions';

const EvaluationScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({
    userId: '',
    employeeIds: [],
    serviceIds: [],
  });

  // Parse deep link/URL parameters if needed
  useEffect(() => {
    // Similar to web version's URL parameter handling
    // This would use linking from React Native
  }, []);

  const handleStart = (values) => {
    setInfo(values);
    setStep(1);
  };

  const steps = [
    <StartPage
      info={info}
      setInfo={setInfo}
      onStart={handleStart}
    />,
    <Questions
      info={info}
      onFinish={() => navigation.goBack()}
      setStep={setStep}
    />
  ];
  
  return steps[step];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EvaluationScreen;