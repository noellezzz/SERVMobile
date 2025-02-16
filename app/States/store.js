import { configureStore } from '@reduxjs/toolkit'
import nameReducer from './Slice/nameSlice'
import formOptionsReducer from './Slice/formOptionsSlice'
import questionReducer from './Slice/questionsSlice'

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'questions',
  storage: AsyncStorage,
  whitelist: ['list'],
}

const persistedQuestionReducer = persistReducer(persistConfig, questionReducer)

const store = configureStore({
  reducer: {
    name: nameReducer,
    formOptions: formOptionsReducer,
    questions: persistedQuestionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }
