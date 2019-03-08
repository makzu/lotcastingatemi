import * as React from 'react'
import { connect } from 'react-redux'

import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@material-ui/core'
import {
  Bookmark,
  BookmarkBorder,
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

import { State } from 'ducks'
import { update } from 'ducks/actions/ByType'
import { canIDelete } from 'selectors'
import { MenuItemProps as Props } from './CharacterMenuItem'

interface StateProps {
  canEdit: boolean
  isPinned: boolean
  isHidden: boolean
}

interface DispatchProps {
  hide(hidden: boolean): void
  pin(pinned: boolean): void
}

interface InnerProps extends StateProps, DispatchProps {}

const CardMenuPin = ({ isPinned, isHidden, canEdit, pin, hide }: InnerProps) =>
  canEdit ? (
    <>
      <Divider />
      <MenuItem button onClick={() => pin(!isPinned)}>
        <ListItemIcon>
          {isPinned ? <Bookmark /> : <BookmarkBorder />}
        </ListItemIcon>
        <ListItemText inset primary={isPinned ? 'Unpin' : 'Pin to Menu'} />
      </MenuItem>

      <MenuItem button onClick={() => hide(!isHidden)}>
        <ListItemIcon>
          {isHidden ? <Visibility /> : <VisibilityOff />}
        </ListItemIcon>
        <ListItemText
          inset
          primary={isHidden ? 'Unhide' : 'Hide from other players'}
        />
      </MenuItem>
    </>
  ) : null

const mapState = (state: State, { characterType, id }: Props): StateProps => ({
  canEdit: canIDelete(state, id, characterType),
  isHidden: state.entities.current[characterType + 's'][id].hidden,
  isPinned: state.entities.current[characterType + 's'][id].pinned,
})

const mapDispatch = (
  dispatch,
  { characterType, id }: Props
): DispatchProps => ({
  hide: (hidden: boolean) => dispatch(update[characterType](id, { hidden })),
  pin: (pinned: boolean) => dispatch(update[characterType](id, { pinned })),
})

export default connect<StateProps, DispatchProps, Props>(
  mapState,
  mapDispatch
)(CardMenuPin)
