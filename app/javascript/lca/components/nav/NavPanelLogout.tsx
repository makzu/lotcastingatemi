import { Divider, ListItemText } from '@material-ui/core'

import { useAppDispatch } from '@lca/hooks/UseAppDispatch'
import { LinkListItem } from 'components/shared/wrappers'
import { logout } from 'ducks/actions'

const NavPanelLogout = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Divider />

      <LinkListItem to="/" onClick={() => dispatch(logout())}>
        <ListItemText primary="Log Out" />
      </LinkListItem>
    </>
  )
}

export default NavPanelLogout
