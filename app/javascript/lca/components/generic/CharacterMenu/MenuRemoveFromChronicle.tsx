import * as React from 'react'
import { connect } from 'react-redux'

import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@material-ui/core'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import { State } from 'ducks'
import { removeThingFromChronicle as removeThing } from 'ducks/actions'
import { canIEdit } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canEdit: boolean
  chronId?: number
}

interface DispatchProps {
  action(chronId: number): void
}

interface InnerProps extends StateProps, DispatchProps, Props {}

const CardMenuRemove = ({ chronId, canEdit, action }: InnerProps) =>
  canEdit && chronId ? (
    <>
      <Divider />
      <MenuItem button onClick={() => action(chronId)}>
        <ListItemIcon>
          <RemoveCircle />
        </ListItemIcon>
        <ListItemText inset primary="Remove from Chronicle" />
      </MenuItem>
    </>
  ) : null

const mapState = (state: State, { id, characterType }: Props): StateProps => ({
  canEdit: canIEdit(state, id, characterType),
  chronId: state.entities.current[characterType + 's'][id].chronicle_id,
})

const mapDispatch = (
  dispatch,
  { id, characterType }: Props
): DispatchProps => ({
  action: chronId => dispatch(removeThing(chronId, id, characterType)),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(CardMenuRemove)
