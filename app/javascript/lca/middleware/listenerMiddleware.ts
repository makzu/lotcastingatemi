import { createListenerMiddleware } from '@reduxjs/toolkit'

import { switchTheme } from '@/features/themeSlice'

export const listenerMiddleware = createListenerMiddleware()

/* Saves changes to the theme to LocalStorage */
listenerMiddleware.startListening({
  actionCreator: switchTheme,
  effect: (action, _listenerApi) => {
    localStorage.setItem('theme', action.payload)
  },
})
