// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import { createBattlegroupFromQc } from 'ducks/actions.js'
import type { CharacterType } from './index.jsx'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  characterType: CharacterType,
}
type Props = ExposedProps & {
  canCreate: boolean,
  createBattlegroupFromQc: Function,
}

function BattlegroupFromQc(props: Props) {
  if (!props.canCreate) return null

  return (
    <MenuItem button onClick={() => props.createBattlegroupFromQc(props.id)}>
      <ListItemText primary="Create Battlegroup of QC" />
    </MenuItem>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canCreate: state.session.authenticated && props.characterType === 'qc',
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    createBattlegroupFromQc,
  }
)

export default enhance(BattlegroupFromQc)
