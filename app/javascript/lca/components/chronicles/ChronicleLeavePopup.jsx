// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { removePlayerFromChronicle as removePlayer } from 'ducks/actions.js'
import { getSpecificChronicle } from 'selectors'

type Props = {
  chronicleId: number,
  playerId: number,
  chronicleName: string,
  removePlayer: Function,
}
class ChronicleLeavePopup extends Component<Props, { open: boolean }> {
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
    const { chronicleName } = this.props

    return (
      <Fragment>
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
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let chronicleName = ''

  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  if (chronicle != undefined && chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    chronicleName: chronicleName,
    playerId: state.session.id,
  }
}

export default connect(
  mapStateToProps,
  { removePlayer }
)(ChronicleLeavePopup)
