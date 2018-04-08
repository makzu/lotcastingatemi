import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { updateCharacter, updateQc, updateBattlegroup } from '../../../ducks/actions.js'
import { canIEdit } from '../../../selectors'

function CardMenuHide(props) {
  if (!props.canIEdit)
    return <div />

  let action
  switch(props.characterType) {
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

  return <MenuItem button onClick={ () => action(props.id, 'hidden', !props.isHidden) }>
    <ListItemIcon>
      { props.isHidden ? <Visibility /> : <VisibilityOff /> }
    </ListItemIcon>
    <ListItemText inset primary={ props.isHidden ? 'Unhide' : 'Hide from other players' } />
  </MenuItem>
}
CardMenuHide.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  canIEdit: PropTypes.bool,
  updateCharacter: PropTypes.func,
  updateQc: PropTypes.func,
  updateBattlegroup: PropTypes.func,
}
function mapStateToProps(state, ownProps) {
  return {
    isHidden: state.entities[ownProps.characterType + 's'][ownProps.id].hidden,
    canIEdit: canIEdit(state, ownProps.id, ownProps.characterType),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateCharacter:   (id, trait, value) => dispatch(updateCharacter(id, trait, value)),
    updateQc:          (id, trait, value) => dispatch(updateQc(id, trait, value)),
    updateBattlegroup: (id, trait, value) => dispatch(updateBattlegroup(id, trait, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardMenuHide)
