import { Divider, ListItemText } from '@material-ui/core'

import { LinkListItem } from '@lca/components/shared/wrappers'
import { logout } from '@lca/ducks/actions'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch'

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
