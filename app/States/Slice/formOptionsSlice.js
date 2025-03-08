import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'formOptions'

const saveStateToStorage = async (state) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving form options to AsyncStorage:', error)
  }
}

const loadInitialState = async () => {
  try {
    const storedState = await AsyncStorage.getItem(STORAGE_KEY)
    return storedState ? JSON.parse(storedState) : null
  } catch (error) {
    console.error('Error loading form options from AsyncStorage:', error)
    return null
  }
}

const defaultState = {
  option: 'Auto',
  language: 'English',
  userId: null,
  employeeIds: [],
  serviceIds: [],
}

export const formOptionsSlice = createSlice({
  name: 'formOptions',
  initialState: defaultState,
  reducers: {
    setOption: (state, action) => {
      state.option = action.payload
      saveStateToStorage(state)
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      saveStateToStorage(state)
    },
    setEvalInfo: (state, action) => {
      state.userId = action.payload?.userId
      state.employeeIds = action.payload?.employeeIds || []
      state.serviceIds = action.payload?.serviceIds || []
      saveStateToStorage(state)
    },
    clearEvalInfo: (state) => {
      state.userId = null
      state.employeeIds = []
      state.serviceIds = []
      saveStateToStorage(state)
    },
    initializeFromStorage: (state, action) => {
      return { ...state, ...action.payload }
    }
  },
})

export const {
  setOption,
  setLanguage,
  setEvalInfo,
  clearEvalInfo,
  initializeFromStorage
} = formOptionsSlice.actions

export const initializeState = () => async (dispatch) => {
  const storedState = await loadInitialState()
  if (storedState) {
    dispatch(initializeFromStorage(storedState))
  }
}

export default formOptionsSlice.reducer
