// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Bookmark from '@material-ui/icons/Bookmark'
import BookmarkBorder from '@material-ui/icons/BookmarkBorder'

import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { canIDelete } from 'selectors'

type Props = {
  id: number,
  characterType: string,
  isPinned: boolean,
  canEdit: boolean,
  updateCharacter: Function,
  updateQc: Function,
  updateBattlegroup: Function,
}

function PinButton(props: Props) {
  if (!props.canEdit) return null

  let action
  switch (props.characterType) {
    case 'qc':
      action = props.updateQc
      break
    case 'battlegroup':
      action = props.updateBattlegroup
      break
    case 'character':
    default:
      action = props.updateCharacter
  }

  return (
    <MenuItem
      button
      onClick={() => action(props.id, 'pinned', !props.isPinned)}
    >
      <ListItemIcon>
        {props.isPinned ? <Bookmark /> : <BookmarkBorder />}
      </ListItemIcon>
      <ListItemText inset primary={props.isPinned ? 'Unpin' : 'Pin to Menu'} />
    </MenuItem>
  )
}
const mapStateToProps = (state, props) => ({
  isPinned: state.entities.current[props.characterType + 's'][props.id].pinned,
  canEdit: canIDelete(state, props.id, props.characterType),
})
export default connect(
  mapStateToProps,
  {
    updateCharacter,
    updateQc,
    updateBattlegroup,
  }
)(PinButton)
