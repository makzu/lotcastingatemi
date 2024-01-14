import { Divider, ListItemText } from '@mui/material'

import { LinkListItem } from '@/components/shared/wrappers'
import { logout } from '@/ducks/actions'
import { useAppDispatch } from '@/hooks'

const NavPanelLogout = () => {
  const dispatch = useAppDispatch()
  const click = () => dispatch(logout)
  return (
    <>
      <Divider />

      <LinkListItem to="/" onClick={click}>
        <ListItemText primary="Log Out" />
      </LinkListItem>
    </>
  )
}

export default NavPanelLogout
