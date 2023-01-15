// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import RatingField from '../generic/RatingField.jsx'
import InitiativeField from './InitiativeField.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { canIEdit } from 'selectors'
import type { withCombatInfo, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  character: withCombatInfo & { id: number },
  characterType: 'character' | 'qc' | 'battlegroup',
}
type Props = ExposedProps & {
  canEdit: boolean,
  update: Function,
}

class CombatControls extends Component<Props> {
  onChange = (e) => {
    this.props.update(this.props.character.id, {
      [e.target.name]: e.target.value,
    })
  }

  onCheck = () => {
    this.props.update(this.props.character.id, {
      has_acted: !this.props.character.has_acted,
    })
  }

  onClickSetOnslaught(value) {
    this.props.update(this.props.character.id, { onslaught: value })
  }

  render() {
    const { character, canEdit } = this.props
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
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
      </div>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canEdit: canIEdit(state, props.character.id, props.characterType),
})

function mapDispatchToProps(dispatch: Function, props: ExposedProps) {
  let action
  switch (props.characterType) {
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
    update: (id, obj) => dispatch(action(id, obj)),
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default enhance(CombatControls)
