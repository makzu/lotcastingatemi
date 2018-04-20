// @flow
import React from 'react'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { canIEdit } from 'selectors'

type Props = {
  id: number,
  characterType: string,
  isHidden: boolean,
  canIEdit: boolean,
  updateCharacter: Function,
  updateQc: Function,
  updateBattlegroup: Function,
}
function CardMenuHide(props: Props) {
  if (!props.canIEdit) return <div />

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
      onClick={() => action(props.id, 'hidden', !props.isHidden)}
    >
      <ListItemIcon>
        {props.isHidden ? <Visibility /> : <VisibilityOff />}
      </ListItemIcon>
      <ListItemText
        inset
        primary={props.isHidden ? 'Unhide' : 'Hide from other players'}
      />
    </MenuItem>
  )
}
const mapStateToProps = (state, props) => ({
  isHidden: state.entities.current[props.characterType + 's'][props.id].hidden,
  canIEdit: canIEdit(state, props.id, props.characterType),
})
export default connect(mapStateToProps, {
  updateCharacter,
  updateQc,
  updateBattlegroup,
})(CardMenuHide)
