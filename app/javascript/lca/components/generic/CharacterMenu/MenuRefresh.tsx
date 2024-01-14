import { connect } from 'react-redux'

import { Refresh } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import { fetch } from '@/ducks/actions/ByType'
import type { MenuItemProps as Props } from './CharacterMenuItem'

interface DispatchProps {
  action(): void
}

const CardMenuRefresh = ({ action }: DispatchProps) => (
  <MenuItem onClick={action}>
    <ListItemIcon>
      <Refresh />
    </ListItemIcon>
    <ListItemText primary="Refresh Data" />
  </MenuItem>
)

const mapDispatch = (
  dispatch,
  { characterType, id }: Props,
): DispatchProps => ({
  action: () => dispatch(fetch[characterType](id)),
})

export default connect<null, DispatchProps, Props>(
  null,
  mapDispatch,
)(CardMenuRefresh)
