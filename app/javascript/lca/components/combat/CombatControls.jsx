// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import { FormControlLabel } from 'material-ui/Form'

import RatingField from '../generic/RatingField.jsx'
import InitiativeField from './InitiativeField.jsx'
import {
  updateCharacterMulti,
  updateQcMulti,
  updateBattlegroupMulti,
} from 'ducks/actions.js'
import { canIEdit } from 'selectors'
import type { withCombatInfo } from 'utils/flow-types'

type Props = {
  character: withCombatInfo & { id: number },
  characterType: string,
  canEdit: boolean,
  update: Function,
}
class CombatControls extends Component<Props> {
  onChange = e => {
    this.props.update(this.props.character.id, {
      [e.target.name]: e.target.value,
    })
  }

  onCheck = () => {
    this.props.update(this.props.character.id, {
      ['has_acted']: !this.props.character.has_acted,
    })
  }

  onClickSetOnslaught(value) {
    this.props.update(this.props.character.id, { ['onslaught']: value })
  }

  onClickRemoveFromBattle = () => {
    this.props.update(this.props.character.id, {
      in_combat: false,
      has_acted: false,
      onslaught: 0,
    })
  }

  render() {
    const { character, canEdit } = this.props
    return (
      <Fragment>
        <div>
          <InitiativeField
            value={character.initiative}
            onChange={this.onChange}
          />
          <FormControlLabel
            label="Acted this round?"
            control={
              <Checkbox
                name="has_acted"
                checked={character.has_acted}
                onChange={this.onCheck}
                disabled={!canEdit}
              />
            }
          />
        </div>
        <div>
          <Button
            size="small"
            onClick={() => this.onClickSetOnslaught(0)}
            disabled={!canEdit}
          >
            =0
          </Button>
          <RatingField
            trait="onslaught"
            label="Onslaught"
            value={character.onslaught}
            min={0}
            margin="dense"
            narrow
            onChange={this.onChange}
          />
          <Button
            size="small"
            onClick={() => this.onClickSetOnslaught(character.onslaught + 1)}
            disabled={!canEdit}
          >
            +1
          </Button>
        </div>
        <div>
          <Button onClick={this.onClickRemoveFromBattle} disabled={!canEdit}>
            Remove from Combat
          </Button>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = (state, props: Object) => ({
  canEdit: canIEdit(state, props.character.id, props.characterType),
})

function mapDispatchToProps(dispatch: Function, props: Object) {
  let action
  switch (props.characterType) {
    case 'qc':
      action = updateQcMulti
      break
    case 'battlegroup':
      action = updateBattlegroupMulti
      break
    case 'character':
    default:
      action = updateCharacterMulti
  }

  return {
    update: (id, obj) => dispatch(action(id, obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatControls)
