import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PaletteMode } from '@mui/material'

const initialState = localStorage.theme as PaletteMode

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (_state, action: PayloadAction<PaletteMode>) => action.payload,
  },
})

export const { switchTheme } = themeSlice.actions

export default themeSlice.reducer
