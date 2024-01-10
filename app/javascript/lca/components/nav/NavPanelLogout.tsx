import * as React from 'react'
import { connect } from 'react-redux'

import { Divider, ListItemText } from '@material-ui/core'

import { LinkListItem } from 'components/shared/wrappers'
import { logout } from 'ducks/actions.js'

const NavPanelLogout = (props) => {
  return (
    <>
      <Divider />

      <LinkListItem to="/" onClick={props.logout}>
        <ListItemText primary="Log Out" />
      </LinkListItem>
    </>
  )
}

export default connect(null, { logout })(NavPanelLogout)
