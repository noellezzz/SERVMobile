import { createSlice } from '@reduxjs/toolkit'

export const formOptionsSlice = createSlice({
  name: 'formOptions',
  initialState: {
    option: 'Auto',
    language: 'English',
  },
  reducers: {
    setOption: (state, action) => {
      state.option = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const { setOption, setLanguage } = formOptionsSlice.actions

export default formOptionsSlice.reducer
