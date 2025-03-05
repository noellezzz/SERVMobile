import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import useResource from '@/Hooks/useResource';
import useEdgeTTSApi from '@/Hooks/useEdgeTTSApi';
import QuestionCard from './QuestionCard';

const Questions = ({ info, onFinish, setStep }) => {
  const [lang, setLang] = useState('en'); // Default to English instead of 'tl'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { speak, isLoading: isSpeaking } = useEdgeTTSApi();
  
  const {
    actions: {
      fetchDatas,
    },
    states: {
      data,
      loading
    }
  } = useResource('tests');

  const {
    actions: {
      doStore
    },
  } = useResource('results');

  // Handlers
  const handleTranscript = (transcript) => {
    // Handle speech-to-text result
  };

  const handleRepeat = () => {
    speak.repeat();
  };

  const handleDone = () => {
    const payload = {
      user_info: info,
      evaluation: questions,
      multiple: true,
      is_new_feedback: true,
    };
    
    doStore(payload).then(() => {
      onFinish();
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Show confirmation dialog and then call handleDone
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep(0);
    }
  };

  // Effects
  useEffect(() => {
    fetchDatas();
    return () => speak.stop();
  }, []);

  useEffect(() => {
    if (data?.length) {
      setQuestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (questions.length) {
      const text = questions[currentQuestionIndex]?.[`question_text_${lang}`];
      if (currentQuestionIndex < 1) {
        setTimeout(() => {
          speak.play(text, lang);
        }, 1000);
      } else {
        speak.play(text, lang);
      }
    }
  }, [currentQuestionIndex, lang]);

  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#e53e3e" />
    </View>
  ) : (
    <View style={styles.container}>
      <QuestionCard
        lang={lang}
        speak={speak}
        question={questions[currentQuestionIndex] || {}}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        setQuestions={setQuestions}
        setLang={setLang}
        onChange={handleTranscript}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleDone={handleDone}
        handleRepeat={handleRepeat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Questions;