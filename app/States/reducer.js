import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './Api/index'
import formOptionsReducer from './Slice/formOptionsSlice'
import questionsReducer from './Slice/questionsSlice'
import resourcesReducer from './Slice/resourcesSlice'

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  formOptions: formOptionsReducer,
  questions: questionsReducer,
  resources: resourcesReducer,
})

export default rootReducer
