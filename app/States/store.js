import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage' // Use AsyncStorage for React Native
import { apiSlice } from './Api/ttsApi' // Ensure this import is correct
import rootReducer from '././reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage instead of default storage
  blacklist: [
    'api',
    'tts',
    // 'auth',
    'theme',
    'loading',
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware), // Ensure the middleware is added here
  devTools: process.env.NODE_ENV === 'development',
})

setupListeners(store.dispatch)
export const persistor = persistStore(store)

export default store
