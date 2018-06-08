// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { createBattlegroup } from 'ducks/actions.js'

type Props = {
  id: number,
  createBattlegroup: Function,
}
type State = {
  open: boolean,
  battlegroup: Object,
}

// TODO: enable creating a battlegroup of a player's existing QC
class BattlegroupCreatePopup extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { open: false, battlegroup: { name: '' } }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    this.setState({ battlegroup: { ...this.state.battlegroup, [name]: value } })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.createBattlegroup(this.state.battlegroup)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { battlegroup } = this.state

    return (
      <span>
        <Button onClick={handleOpen}>Create New</Button>
        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Create New Battlegroup</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              value={battlegroup.name}
              label="Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    )
  }
}

const mapStateToProps = state => ({ id: state.session.id })

export default connect(
  mapStateToProps,
  { createBattlegroup }
)(BattlegroupCreatePopup)
