// @flow
import React from 'react'
import { connect } from 'react-redux'

import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import { createBattlegroupFromQc } from 'ducks/actions.js'

type Props = {
  id: number,
  characterType: string,
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
const mapStateToProps = (state, props) => ({
  canCreate: state.session.authenticated && props.characterType === 'qc',
})

export default connect(
  mapStateToProps,
  {
    createBattlegroupFromQc,
  }
)(BattlegroupFromQc)
