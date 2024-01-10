import { SyntheticEvent, useCallback, useState } from 'react'

type MenuEvent = SyntheticEvent<HTMLElement>
type MenuElement = HTMLElement | null

/** React hook for Material-UI Menus that open on a particular button
 *  Returns an anchor element, an onClick handler to open the menu, and a close handler
 */
const useMenuLogic = () => {
  const [anchor, setAnchor] = useState<MenuElement>(null)
  const handleOpen = useCallback(
    (e: MenuEvent) => setAnchor(e.currentTarget),
    [setAnchor],
  )
  const handleClose = useCallback(() => setAnchor(null), [setAnchor])

  return [anchor, handleOpen, handleClose] as [
    MenuElement,
    typeof handleOpen,
    typeof handleClose,
  ]
}

export default useMenuLogic
