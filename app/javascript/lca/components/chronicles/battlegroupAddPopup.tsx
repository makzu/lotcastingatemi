import { Component, type ReactNode } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { addThingToChronicle } from '@lca/ducks/actions.ts'
import {
  getMyBattlegroupsWithoutChronicles,
  getSpecificChronicle,
} from '@lca/selectors'
import type { Battlegroup } from '@lca/types/battlegroup.ts'

type ExposedProps = {
  chronicleId: number
}
type Props = ExposedProps & {
  battlegroups: Array<Battlegroup>
  chronicleName: string
  handleSubmit: Function
}
type State = {
  open: boolean
  battlegroupId: number
}

class BattlegroupAddPopup extends Component<Props, State> {
  state = {
    open: false,
    battlegroupId: 0,
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    if (this.state.battlegroupId === 0) return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.battlegroupId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, battlegroups } = this.props

    const options: ReactNode = [
      <MenuItem key={0} value={0} disabled>
        Select a Battlegroup
      </MenuItem>,
      <Divider key="div" />,
      ...battlegroups.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      )),
    ]

    const currentBattlegroup = battlegroups.find(
      (c) => c.id === this.state.battlegroupId,
    )
    const hidden = currentBattlegroup?.hidden
    return (
      <>
        <Button onClick={handleOpen}>Add Battlegroup</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Add a Battlegroup to {chronicleName}</DialogTitle>
          <DialogContent>
            <TextField
              select
              value={this.state.battlegroupId}
              name="battlegroupId"
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {options}
            </TextField>
            {hidden && (
              <DialogContentText>
                This Battlegroup is hidden. It will only be visible to you and
                the storyteller.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  const battlegroups = getMyBattlegroupsWithoutChronicles(state)
  let chronicleName = ''

  if (chronicle.name !== undefined) {
    chronicleName = chronicle.name
  }

  return {
    battlegroups,
    chronicleName,
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (id, battlegroupId) =>
    dispatch(addThingToChronicle(id, battlegroupId, 'battlegroup')),
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(BattlegroupAddPopup)
