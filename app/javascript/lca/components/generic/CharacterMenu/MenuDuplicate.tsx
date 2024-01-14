import { connect } from 'react-redux'

import { PersonAdd } from '@mui/icons-material'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'

import type { State } from 'ducks'
import { duplicate } from 'ducks/actions/ByType'
import type { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canDupe: boolean
}

interface DispatchProps {
  action(): void
}

interface InnerProps extends StateProps, DispatchProps {}

const DuplicateButton = ({ canDupe, action }: InnerProps) =>
  canDupe ? (
    <MenuItem onClick={action}>
      <ListItemIcon>
        <PersonAdd />
      </ListItemIcon>
      <ListItemText primary="Duplicate" />
    </MenuItem>
  ) : null

const mapState = (state: State): StateProps => ({
  canDupe: state.session.authenticated,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props,
): DispatchProps => ({
  action: () => dispatch(duplicate[characterType](id)),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch,
)(DuplicateButton)
