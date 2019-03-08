import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'

import { State } from 'ducks'
import { duplicate } from 'ducks/actions/ByType'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canDupe: boolean
}

interface DispatchProps {
  action(): void
}

interface InnerProps extends StateProps, DispatchProps {}

const DuplicateButton = ({ canDupe, action }: InnerProps) =>
  canDupe ? (
    <MenuItem button onClick={action}>
      <ListItemText primary="Duplicate" />
    </MenuItem>
  ) : null

const mapState = (state: State): StateProps => ({
  canDupe: state.session.authenticated,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({
  action: () => dispatch(duplicate[characterType](id)),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(DuplicateButton)
