// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import {
  duplicateCharacter,
  duplicateQc,
  duplicateBattlegroup,
} from 'ducks/actions.js'

type Props = {
  id: number,
  characterType: string,
  canDupe: boolean,
  duplicateCharacter: Function,
  duplicateQc: Function,
  duplicateBattlegroup: Function,
}

function DuplicateButton(props: Props) {
  if (!props.canDupe) return null

  let action
  switch (props.characterType) {
    case 'qc':
      action = props.duplicateQc
      break
    case 'battlegroup':
      action = props.duplicateBattlegroup
      break
    case 'character':
      action = props.duplicateCharacter
      break
    default:
      action = x => x
      break
  }

  return (
    <MenuItem button onClick={() => action(props.id)}>
      <ListItemText primary="Duplicate" />
    </MenuItem>
  )
}

const mapStateToProps = state => ({
  canDupe: state.session.authenticated,
})
export default connect(
  mapStateToProps,
  {
    duplicateCharacter,
    duplicateQc,
    duplicateBattlegroup,
  }
)(DuplicateButton)
