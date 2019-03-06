import { SyntheticEvent, useCallback, useState } from 'react'

type MEvent = SyntheticEvent

/** React hook for Material-UI Menus that open on a particular button
 *  Returns an anchor element, an onClick handler to open the menu, and a close handler
 */
const useMenuLogic = (): [HTMLElement, (e: MEvent) => void, () => void] => {
  const [anchor, setAnchor] = useState(null)
  const handleOpen = useCallback((e: MEvent) => setAnchor(e.currentTarget), [
    setAnchor,
  ])
  const handleClose = useCallback(() => setAnchor(null), [setAnchor])

  return [anchor, handleOpen, handleClose]
}

export default useMenuLogic
