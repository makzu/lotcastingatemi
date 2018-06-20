// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveFromCombatButton)
