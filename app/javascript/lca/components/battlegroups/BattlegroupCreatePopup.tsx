import { type ChangeEvent, Component } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import { createBattlegroup } from '@lca/ducks/actions.ts'
import type { Battlegroup } from '@lca/types/battlegroup.ts'

type State = {
  open: boolean
  battlegroup: Partial<Battlegroup>
}

class BattlegroupCreatePopup extends Component<PropsFromRedux, State> {
  state = { open: false, battlegroup: { name: '' } }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

const connector = connect(null, { createBattlegroup })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BattlegroupCreatePopup)
