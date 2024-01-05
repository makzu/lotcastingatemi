// @flow
import React from 'react'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { createBattlegroup } from 'ducks/actions.js'
import type { Enhancer } from 'utils/flow-types'

type Props = { createBattlegroup: Function }
type State = {
  open: boolean,
  battlegroup: Object,
}

class BattlegroupCreatePopup extends React.Component<Props, State> {
  state = { open: false, battlegroup: { name: '' } }

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
      <>
        <Button onClick={handleOpen} data-cy="create-battlegroup">
          Create New
        </Button>
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
              inputProps={{
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lp-ignore': 'true',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              data-cy="submit"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const enhance: Enhancer<Props, {}> = connect(null, { createBattlegroup })

export default enhance(BattlegroupCreatePopup)
