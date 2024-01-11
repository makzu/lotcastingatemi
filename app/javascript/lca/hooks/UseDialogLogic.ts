import { useCallback, useState } from 'react'

/** React hook for Material-Ui Dialogs
 *  Returns an open flag, an open handler, and a close handler
 */
const useDialogLogic = () => {
  const [isOpen, setIsOpen] = useState(false)
  const setOpen = useCallback(() => setIsOpen(true), [setIsOpen])
  const setClosed = useCallback(() => setIsOpen(false), [setIsOpen])

  return [isOpen, setOpen, setClosed] as const
}

export default useDialogLogic
