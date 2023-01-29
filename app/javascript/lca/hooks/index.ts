import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'

export { default as useDialogLogic } from './UseDialogLogic'
export { default as useLazyFetch } from './UseLazyFetch'
export { default as useMenuLogic } from './UseMenuLogic'
export { default as useDocumentTitle } from './UseDocumentTitle'
export { default as useIdFromParams } from './UseIdFromParams'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
