import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '@/Components/Buttons/CustomButton';
import ModeSelector from '@/Components/Interactables/ModeSelector';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, setOption } from '@/States/Slice/formOptionsSlice';

// Import rating images
import rating1 from '@/../assets/ratings/1.png'; 
import rating2 from '@/../assets/ratings/2.png';
import rating3 from '@/../assets/ratings/3.png';
import rating4 from '@/../assets/ratings/4.png';
import rating5 from '@/../assets/ratings/5.png';

const QuestionCard = ({
  question,
  questions,
  lang,
  speak,
  currentQuestionIndex,
  setQuestions,
  setLang,
  onChange,
  handleNext,
  handlePrev,
  handleDone,
  handleRepeat,
}) => {
  const [answer, setAnswer] = useState('');
  const [rating, setRating] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const options = useSelector(state => state.formOptions.option);
  const language = useSelector(state => state.formOptions.language);
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    if (question?.answer) {
      setAnswer(question.answer);
    } else {
      setAnswer('');
    }
    
    if (question?.rating) {
      setRating(question.rating);
    } else {
      setRating(0);
    }
  }, [question]);

  // Language handling
  useEffect(() => {
    if (lang === 'en') {
      dispatch(setLanguage('English'));
    } else {
      dispatch(setLanguage('Tagalog'));
    }
  }, [lang]);

  const handleLanguageChange = (selectedLang) => {
    if (selectedLang === 'English') {
      setLang('en');
    } else {
      setLang('tl');
    }
    dispatch(setLanguage(selectedLang));
  };

  const handleSubmit = () => {
    setQuestions(prev => prev.map((q, i) => {
      if (i === currentQuestionIndex) {
        return { ...q, answer, rating };
      }
      return q;
    }));
    
    handleNext();
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would start/stop speech recognition
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionCount}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {question?.[`question_text_${lang === 'en' ? 'en' : 'tl'}`] || ''}
          </Text>
          
          <TouchableOpacity 
            style={styles.micButton}
            onPress={toggleListening}
          >
            <Ionicons 
              name={isListening ? "mic" : "mic-off"} 
              size={24} 
              color={isListening ? "green" : "gray"} 
            />
          </TouchableOpacity>
        </View>
        
        {options === 'Type to Answer' && (
          <TextInput
            style={styles.answerInput}
            multiline
            value={answer}
            onChangeText={(text) => {
              setAnswer(text);
              onChange(text);
            }}
            placeholder="Type your answer here..."
          />
        )}
        
        {/* Rating options */}
        <View style={styles.ratingContainer}>
          {[rating1, rating2, rating3, rating4, rating5].map((ratingImg, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.ratingButton,
                rating === index + 1 && styles.selectedRating
              ]}
              onPress={() => setRating(index + 1)}
            >
              <Image 
                source={ratingImg} 
                style={styles.ratingImage} 
              />
              <Text style={styles.ratingText}>
                {["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"][index]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={options === 'Type to Answer' ? 'Enter' : 'Talk'}
            icon={() => options === 'Type to Answer' ? null : <Ionicons name="mic" size={24} color="white" />}
            onPress={handleSubmit}
          />
          
          <View style={styles.navButtons}>
            <View style={styles.buttonHalf}>
              <CustomButton
                mode="outlined"
                title="Prev"
                disabled={currentQuestionIndex === 0}
                onPress={handlePrev}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                mode="outlined"
                title="Next"
                disabled={currentQuestionIndex === questions.length - 1}
                onPress={handleNext}
              />
            </View>
          </View>
        </View>
      </View>
      
      {/* Mode selectors */}
      <View style={styles.modeContainer}>
        <ModeSelector
          options={['Auto', 'Push to Talk', 'Type to Answer']}
          selectedOption={options}
          changeMode={(mode) => dispatch(setOption(mode))}
        />
        <ModeSelector
          options={['English', 'Tagalog']}
          selectedOption={lang === 'en' ? 'English' : 'Tagalog'}
          changeMode={handleLanguageChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    paddingVertical: 40,
    elevation: 5,
    marginBottom: 16,
  },
  questionCount: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 8,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    paddingRight: 8,
  },
  micButton: {
    padding: 8,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 16,
    gap: 8,
  },
  ratingButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  selectedRating: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#000',
  },
  ratingImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  ratingText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: 20,
    gap: 10,
  },
  navButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  buttonHalf: {
    flex: 1,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default QuestionCard;