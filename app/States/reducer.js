import { combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './Api/ttsApi'
import formOptionsReducer from './Slice/formOptionsSlice'
import questionsReducer from './Slice/questionsSlice'
// ...import other reducers...

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  formOptions: formOptionsReducer,
  questions: questionsReducer,
  // ...add other reducers here...
})

export default rootReducer
