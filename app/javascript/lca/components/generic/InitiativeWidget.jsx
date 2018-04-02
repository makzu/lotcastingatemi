import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import { FormControlLabel } from 'material-ui/Form'

import RatingField from './RatingField.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from '../../ducks/actions.js'
import { canIEdit } from '../../selectors'

class InitiativeWidget extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  onChange(e) {
    this.props.update(this.props.character.id, e.target.name, e.target.value)
  }

  onCheck() {
    this.props.update(this.props.character.id, 'has_acted', !this.props.character.has_acted)
  }

  onClickSetOnslaught(value) {
    this.props.update(this.props.character.id, 'onslaught', value)
  }

  render() {
    const { character } = this.props
    return <Fragment>
      <div>
        <RatingField trait="initiative" label="Initiative"
          value={ character.initiative }
          margin="dense" narrow
          onChange={ this.onChange }
        />
        <FormControlLabel label="Acted this round?"
          control={
            <Checkbox name="has_acted" checked={ character.has_acted } onChange={ this.onCheck } />
          }
        />
      </div>
      <div>
        <Button
          size="small"
          onClick={ () => this.onClickSetOnslaught(0) }
        >
          =0
        </Button>
        <RatingField trait="onslaught" label="Onslaught"
          value={ character.onslaught } min={ 0 }
          margin="dense" narrow
          onChange={ this.onChange }
        />
        <Button
          size="small"
          onClick={ () => this.onClickSetOnslaught(character.onslaught + 1) }
        >
          +1
        </Button>
      </div>
    </Fragment>
  }
}

InitiativeWidget.propTypes = {
  character: PropTypes.object.isRequired,
  characterType: PropTypes.string.isRequired,
  canIEdit: PropTypes.bool,
  update: PropTypes.func,
}
function mapStateToProps(state, props) {
  return {
    canEdit: canIEdit(state, props.id, props.characterType),
  }
}
function mapDispatchToProps(dispatch, props) {
  let action
  switch(props.character.type) {
  case 'qc':
    action = updateQc
    break
  case 'battlegroup':
    action = updateBattlegroup
    break
  case 'character':
  default:
    action = updateCharacter
  }

  return {
    update: (id, trait, value) => dispatch(action(id, trait, value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InitiativeWidget)
