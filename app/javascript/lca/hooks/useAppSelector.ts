import { useSelector, type TypedUseSelectorHook } from 'react-redux'

import type { RootState } from 'store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
