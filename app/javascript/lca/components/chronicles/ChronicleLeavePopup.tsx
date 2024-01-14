import { Component } from 'react'
import { connect } from 'react-redux'

import { removePlayerFromChronicle as removePlayer } from '@/ducks/actions'
import { getSpecificChronicle } from '@/selectors'
import type { Enhancer } from '@/utils/flow-types'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface ExposedProps {
  chronicleId: number
}
type Props = ExposedProps & {
  playerId: number
  chronicleName: string
  removePlayer: $TSFixMeFunction
}
interface State {
  open: boolean
}

class ChronicleLeavePopup extends Component<Props, State> {
  state = { open: false }

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
  handleSubmit = () => {
    this.setState({
      open: false,
    })
    this.props.removePlayer(this.props.chronicleId, this.props.playerId)
  }

  render() {
    const { handleOpen, handleClose, handleSubmit } = this
    const { chronicleName } = this.props
    return (
      <>
        <Button onClick={handleOpen}>Leave Chronicle</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Leave {chronicleName}?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will remove you and all of your characters from{' '}
              {chronicleName}.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  let chronicleName = ''
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)

  if (chronicle?.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    chronicleName: chronicleName,
    playerId: state.session.id,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  removePlayer,
})
export default enhance(ChronicleLeavePopup)
