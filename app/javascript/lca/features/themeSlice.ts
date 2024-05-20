import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { PaletteMode } from '@mui/material'

const initialState = (localStorage.theme ?? 'light') as PaletteMode

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (_state, action: PayloadAction<PaletteMode>) => action.payload,
  },
})

export const { switchTheme } = themeSlice.actions

export default themeSlice.reducer
