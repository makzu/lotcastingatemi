import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Delete from 'material-ui-icons/Delete'

import { destroyCharacter, destroyQc, destroyBattlegroup } from '../../ducks/actions.js'

function DeleteButton(props) {
  let action
  switch(props.characterType) {
  case 'qcs':
    action = props.destroyQc
    break
  case 'battlegroups':
    action = props.destroyBattlegroup
    break
  case 'characters':
  default:
    action = props.destroyCharacter
  }

  return <Button
    onClick={() => action(props.id)}
    style={{ float: 'right', }}
  >
    Delete&nbsp;
    <Delete />
  </Button>
}
DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
  destroyCharacter: PropTypes.func,
  destroyQc: PropTypes.func,
  destroyBattlegroup: PropTypes.func,
}
function mapStateToProps(state, ownProps) {
  return {
    isPinned: state.entities[ownProps.characterType][ownProps.id].pinned
  }
}
function mapDispatchToProps(dispatch) {
  return {
    destroyCharacter:   (id) => dispatch(destroyCharacter(id)),
    destroyQc:          (id) => dispatch(destroyQc(id)),
    destroyBattlegroup: (id) => dispatch(destroyBattlegroup(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
