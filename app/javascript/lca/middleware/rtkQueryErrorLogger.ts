import {
  isRejectedWithValue,
  type Middleware,
  type MiddlewareAPI,
} from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.groupCollapsed('RTK Query Error')
      console.warn('We got a rejected action!')
      console.warn(
        'data' in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message,
      )
      console.groupEnd()
      // toast.warn({
      //   title: 'Async error!',
      //   message:
      //     'data' in action.error
      //       ? (action.error.data as { message: string }).message
      //       : action.error.message,
      // })
    }

    return next(action)
  }
