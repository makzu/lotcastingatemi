import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import { updateCharacter, updateQc, updateBattlegroup } from '../../ducks/actions.js'

function HideButton(props) {
  let action
  switch(props.characterType) {
  case 'qcs':
    action = props.updateQc
    break
  case 'battlegroups':
    action = props.updateBattlegroup
    break
  case 'characters':
  default:
    action = props.updateCharacter
  }

  if (props.isHidden) {
    return <Button
      onClick={() => action(props.id, 'hidden', false)}
    >
      Unhide&nbsp;
      <Visibility />
    </Button>
  } else {
    return <Button
      onClick={() => action(props.id, 'hidden', true)}
    >
      Hide&nbsp;
      <VisibilityOff />
    </Button>
  }
}
HideButton.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  updateCharacter: PropTypes.func,
  updateQc: PropTypes.func,
  updateBattlegroup: PropTypes.func,
}
function mapStateToProps(state, ownProps) {
  return {
    isHidden: state.entities[ownProps.characterType][ownProps.id].hidden
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateCharacter:   (id, trait, value) => dispatch(updateCharacter(id, trait, value)),
    updateQc:          (id, trait, value) => dispatch(updateQc(id, trait, value)),
    updateBattlegroup: (id, trait, value) => dispatch(updateBattlegroup(id, trait, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HideButton)
