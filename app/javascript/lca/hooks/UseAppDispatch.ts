import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@lca/store'

export const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
