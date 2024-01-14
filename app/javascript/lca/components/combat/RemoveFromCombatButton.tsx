import { Component } from 'react'
import { connect } from 'react-redux'

import { updateCharacter, updateQc, updateBattlegroup } from '@/ducks/actions'

import { canIEdit } from '@/selectors'
import type { withCombatInfo, Enhancer } from '@/utils/flow-types'
import { Button } from '@mui/material'
interface ExposedProps {
  character: withCombatInfo & {
    id: number
  }
  characterType: 'character' | 'qc' | 'battlegroup'
}
type Props = ExposedProps & {
  canEdit: boolean
  update: $TSFixMeFunction
}

class RemoveFromCombatButton extends Component<Props> {
  onClickRemoveFromBattle = () => {
    this.props.update(this.props.character.id, {
      in_combat: false,
      has_acted: false,
      onslaught: 0,
    })
  }

  render() {
    const { canEdit } = this.props
    if (!canEdit) return null
    return (
      <Button onClick={this.onClickRemoveFromBattle}>Remove from Combat</Button>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canEdit: canIEdit(state, props.character.id, props.characterType),
})

function mapDispatchToProps(dispatch: $TSFixMeFunction, props: ExposedProps) {
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
export default enhance(RemoveFromCombatButton)
