import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'questions',
  storage: AsyncStorage,
}

const initialState = {
  list: [
    {
      english: 'How was the overall service?',
      tagalog: 'Kamusta ang kabuuang serbisyo?',
      audioEnglish: '',
      audioTagalog: '',
    },
    {
      english: 'What can you say about the Staff?',
      tagalog: 'Ano ang masasabi mo sa mga staff?',
      audioEnglish: '',
      audioTagalog: '',
    },
    {
      english: 'Did you encounter any unpleasant experience during the service',
      tagalog: 'Nagkaroon ka ba ng hindi magandang karanasan sa serbisyo?',
      audioEnglish: '',
      audioTagalog: '',
    },
    {
      english: 'Was all your needs met during the service?',
      tagalog: 'Napagtuonan ba ng pansin ang lahat ng iyong pangangailangan?',
      audioEnglish: '',
      audioTagalog: '',
    },
  ],
}

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.list = action.payload
    },
    addQuestion: (state, action) => {
      state.list.push(action.payload)
    },
    deleteQuestion: (state, action) => {
      state.list.splice(action.payload, 1)
    },
    clearQuestions: state => {
      state.list = []
    },
    updateQuestions: (state, action) => {
      state.list = state.list.map((question, index) => ({
        ...question,
        ...action.payload[index], // Merge updated data
      }))
    },
    resetQuestions: () => initialState,
  },
})

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  clearQuestions,
  updateQuestions,
  resetQuestions,
} = questionSlice.actions
export default questionSlice.reducer
