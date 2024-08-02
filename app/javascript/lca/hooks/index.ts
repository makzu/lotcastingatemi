export { default as useAppDispatch } from './UseAppDispatch'
export { default as useAppSelector } from './useAppSelector'
export { default as useDebounce } from './UseDebounce'
export { default as useDialogLogic } from './UseDialogLogic'
export { default as useDocumentTitle } from './UseDocumentTitle'
export { default as useIdFromParams } from './UseIdFromParams'
export { default as useLazyFetch } from './UseLazyFetch'
export { default as useMenuLogic } from './UseMenuLogic'
export { default as useSensorsWrapped } from './UseSensorsWrapped'
export { default as useToggleBoolean } from './UseToggleBoolean'

import useAppSelector from './useAppSelector'

export function useCurrentPlayerId() {
  return useAppSelector((state) => state.session.id)
}
