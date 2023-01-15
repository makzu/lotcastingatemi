import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'store'

import useDialogLogic from './UseDialogLogic'
import useLazyFetch from './UseLazyFetch'
import useMenuLogic from './UseMenuLogic'

export { useDialogLogic, useMenuLogic, useLazyFetch }

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
