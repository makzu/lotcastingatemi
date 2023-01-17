import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'

import useDialogLogic from './UseDialogLogic'
import useLazyFetch from './UseLazyFetch'
import useMenuLogic from './UseMenuLogic'

export { useDialogLogic, useMenuLogic, useLazyFetch }
export * from './UseDocumentTitle'
export * from './UseIdFromParams'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
