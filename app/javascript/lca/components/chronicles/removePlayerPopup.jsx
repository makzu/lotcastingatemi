// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { removePlayerFromChronicle as removePlayer } from 'ducks/actions'
import { getSpecificChronicle, getSpecificPlayer } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  chronicleId: number,
  playerId: number,
}
type Props = ExposedProps & {
  chronicleName: string,
  playerName: string,
  removePlayer: Function,
}
type State = {
  open: boolean,
}

class RemovePlayerPopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.removePlayer(this.props.chronicleId, this.props.playerId)
  }

  render() {
    const { handleOpen, handleClose, handleSubmit } = this
    const { chronicleName, playerName } = this.props

    return (
      <>
        <Button onClick={handleOpen}>Kick</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Remove {playerName}?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will remove {playerName} and all of their characters from{' '}
              {chronicleName}.
            </DialogContentText>
            <DialogContentText>
              They will be able to re-join unless you generate a new invite code
              or disable invitations.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  let chronicleName,
    playerName = ''

  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  if (chronicle != undefined && chronicle.name != undefined) {
    chronicleName = chronicle.name
    // TODO add some kind of error here if it can't find a player
    playerName = (getSpecificPlayer(state, ownProps.playerId) || {})
      .display_name
  }

  return {
    chronicleName: chronicleName,
    playerName: playerName,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  removePlayer,
})

export default enhance(RemovePlayerPopup)
