// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import {
  updateCharacterMulti,
  updateQcMulti,
  updateBattlegroupMulti,
} from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Character, fullQc, Battlegroup } from 'utils/flow-types'

// eslint-disable-next-line no-unused-vars
const styles = theme => ({})

type Props = {
  character: Character | fullQc | Battlegroup,
  canEdit: boolean,
  update: Function,
  pool: Object,
  classes: Object,
}
type State = { open: boolean, initiative: number }
class JoinBattlePopup extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { open: false, initiative: 0 }
  }

  handleChange = e => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false, initiative: 0 })

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.update(this.props.character.id, this.state.initiative)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { character, pool } = this.props

    return (
      <Fragment>
        <Button onClick={handleOpen}>Roll Join Battle</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Join Battle</DialogTitle>
          <DialogContent>
            <PoolDisplay
              qc={character.type === 'qc' || character.type === 'battlegroup'}
              pool={pool}
              label="Join Battle Pool"
            />

            <RatingField
              trait="initiative"
              label="Result"
              value={this.state.initiative}
              onChange={handleChange}
            />
            <DialogContentText>
              {character.name} will join combat with {this.state.initiative + 3}{' '}
              initiative.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Join Battle
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
function mapStateToProps(state, props) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'

  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}
function mapDispatchToProps(dispatch: Function, props) {
  let action
  switch (props.character.type) {
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
    update: (id, value) =>
      dispatch(action(id, { in_combat: true, initiative: 3 + value })),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(JoinBattlePopup)
)
