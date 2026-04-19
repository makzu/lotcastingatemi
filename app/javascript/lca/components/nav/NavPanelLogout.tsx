import * as React from 'react'
import { useDispatch } from 'react-redux'

import { Divider, ListItemText } from '@material-ui/core'

import { LinkListItem } from 'components/shared/wrappers'
import { logout } from 'ducks/actions'

const NavPanelLogout = () => {
  const dispatch = useDispatch()

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
