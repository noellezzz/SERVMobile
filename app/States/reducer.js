import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './Api/index'
import formOptionsReducer from './Slice/formOptionsSlice'
import questionsReducer from './Slice/questionsSlice'
// ...import other reducers...

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  formOptions: formOptionsReducer,
  questions: questionsReducer,
})

export default rootReducer
