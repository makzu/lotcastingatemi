import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '@lca/store.ts'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
