import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemText, MenuItem } from '@material-ui/core'

import { fetch } from 'ducks/actions/ByType'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface DispatchProps {
  action(): void
}

const CardMenuRefresh = ({ action }: DispatchProps) => (
  <MenuItem button onClick={action}>
    <ListItemText primary="Refresh Data" />
  </MenuItem>
)

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({
  action: () => dispatch(fetch[characterType](id)),
})

export default connect<null, DispatchProps, Props>(
  null,
  mapDispatch
)(CardMenuRefresh)
