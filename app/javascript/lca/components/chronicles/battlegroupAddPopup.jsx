// @flow
import { Component, Node } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { addThingToChronicle } from 'ducks/actions.js'
import {
  getSpecificChronicle,
  getMyBattlegroupsWithoutChronicles,
} from 'selectors'
import type { Battlegroup, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  chronicleId: number,
}
type Props = ExposedProps & {
  battlegroups: Array<Battlegroup>,
  chronicleName: string,
  handleSubmit: Function,
}
type State = {
  open: boolean,
  battlegroupId: number,
}

class BattlegroupAddPopup extends Component<Props, State> {
  state = {
    open: false,
    battlegroupId: 0,
  }

  handleChange = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    if (this.state.battlegroupId == 0) return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.battlegroupId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, battlegroups } = this.props

    const options: Node = [
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
      (c) => c.id == this.state.battlegroupId,
    )
    const hidden = currentBattlegroup && currentBattlegroup.hidden
    return (
      <>
        <Button onClick={handleOpen}>Add Battlegroup</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Add a Battlegroup to {chronicleName}</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
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

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    battlegroups,
    chronicleName,
  }
}

const mapDispatchToProps: Object = (dispatch) => ({
  handleSubmit: (id, battlegroupId) =>
    dispatch(addThingToChronicle(id, battlegroupId, 'battlegroup')),
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default enhance(BattlegroupAddPopup)
