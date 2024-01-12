import { Component, SyntheticInputEvent } from 'react'
import { connect } from 'react-redux'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { createBattlegroup } from 'ducks/actions'
import type { Enhancer } from 'utils/flow-types'
interface Props {
  createBattlegroup: $TSFixMeFunction
}
interface State {
  open: boolean
  battlegroup: Record<string, $TSFixMe>
}

class BattlegroupCreatePopup extends Component<Props, State> {
  state = { open: false, battlegroup: { name: '' } }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState({
      battlegroup: { ...this.state.battlegroup, [name]: value },
    })
  }
  handleSubmit = () => {
    this.setState({
      open: false,
    })
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
