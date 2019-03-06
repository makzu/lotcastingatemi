import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { State } from 'ducks'
import { update } from 'ducks/actions/ByType'
import { canIDelete } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenu'

interface StateProps {
  canEdit: boolean
  isHidden: boolean
}

interface DispatchProps {
  action(pinned: boolean): void
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const CardMenuHide = ({ isHidden, canEdit, action }: InnerProps) =>
  canEdit ? (
    <MenuItem button onClick={() => action(!isHidden)}>
      <ListItemIcon>
        {isHidden ? <Visibility /> : <VisibilityOff />}
      </ListItemIcon>
      <ListItemText
        inset
        primary={isHidden ? 'Unhide' : 'Hide from other players'}
      />
    </MenuItem>
  ) : null

const mapState = (state: State, { characterType, id }: Props): StateProps => ({
  canEdit: canIDelete(state, id, characterType),
  isHidden: state.entities.current[characterType + 's'][id].hidden,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({
  action: (hidden: boolean) => dispatch(update[characterType](id, { hidden })),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(CardMenuHide)
