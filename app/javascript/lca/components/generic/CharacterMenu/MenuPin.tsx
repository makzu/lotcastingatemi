import * as React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import Bookmark from '@material-ui/icons/Bookmark'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'

import { State } from 'ducks'
import { update } from 'ducks/actions/ByType'
import { canIDelete } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenu'

interface StateProps {
  canEdit: boolean
  isPinned: boolean
}

interface DispatchProps {
  action(pinned: boolean): void
}

interface InnerProps extends StateProps, DispatchProps {}

const CardMenuPin = ({ isPinned, canEdit, action }: InnerProps) =>
  canEdit ? (
    <MenuItem button onClick={() => action(!isPinned)}>
      <ListItemIcon>
        {isPinned ? <Bookmark /> : <BookmarkBorder />}
      </ListItemIcon>
      <ListItemText inset primary={isPinned ? 'Unpin' : 'Pin to Menu'} />
    </MenuItem>
  ) : null

const mapState = (state: State, { characterType, id }: Props): StateProps => ({
  canEdit: canIDelete(state, id, characterType),
  isPinned: state.entities.current[characterType + 's'][id].pinned,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({
  action: (pinned: boolean) => dispatch(update[characterType](id, { pinned })),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(CardMenuPin)
