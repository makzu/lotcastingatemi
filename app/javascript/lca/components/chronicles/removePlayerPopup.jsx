// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import { removePlayerFromChronicle as removePlayer } from 'ducks/actions.js'
import { getSpecificChronicle, getSpecificPlayer } from 'selectors'

type State = {
  chronicleId: number,
  playerId: number,
  chronicleName: string,
  playerName: string,
  removePlayer: Function,
}
class RemovePlayerPopup extends Component<State, { open: boolean }> {
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
      <Fragment>
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
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
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

export default connect(mapStateToProps, { removePlayer })(RemovePlayerPopup)
