import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Bookmark from 'material-ui-icons/Bookmark'
import BookmarkBorder from 'material-ui-icons/BookmarkBorder'

import { updateCharacter, updateQc, updateBattlegroup } from '../../ducks/actions.js'

function PinButton(props) {
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

  if (props.isPinned) {
    return <Button
      onClick={() => action(props.id, 'pinned', false)}
      style={{ float: 'right', }}
    >
      Unpin&nbsp;
      <Bookmark />
    </Button>
  } else {
    return <Button
      onClick={() => action(props.id, 'pinned', true)}
      style={{ float: 'right', }}
    >
      Pin&nbsp;
      <BookmarkBorder />
    </Button>
  }
}
PinButton.propTypes = {
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
}
function mapStateToProps(state, ownProps) {
  return {
    isPinned: state.entities[ownProps.characterType][ownProps.id].pinned
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateCharacter:   (id, trait, value) => dispatch(updateCharacter(id, trait, value)),
    updateQc:          (id, trait, value) => dispatch(updateQc(id, trait, value)),
    updateBattlegroup: (id, trait, value) => dispatch(updateBattlegroup(id, trait, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PinButton)
