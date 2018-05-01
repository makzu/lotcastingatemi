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

import { updateChronicle, regenChronicleInviteCode } from 'ducks/actions.js'
import { getSpecificChronicle } from 'selectors'

type Props = {
  id: number,
  inviteCode: string,
  chronicleName: String,
  updateChronicle: Function,
  regenChronicleInviteCode: Function,
}
class ChronicleInvitePopup extends Component<Props, { open: boolean }> {
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

  handleRegen = () => {
    this.props.regenChronicleInviteCode(this.props.id)
  }

  handleDisable = () => {
    this.props.updateChronicle(this.props.id, 'invite_code', '')
  }

  render() {
    const { handleOpen, handleClose, handleRegen, handleDisable } = this
    const { chronicleName, inviteCode } = this.props

    return (
      <Fragment>
        <Button onClick={handleOpen}>Invite Player</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Invite a Player</DialogTitle>
          <DialogContent>
            {inviteCode && (
              <Fragment>
                <DialogContentText paragraph>
                  Another player can join {chronicleName} if they have this
                  code.
                </DialogContentText>
                <DialogContentText variant="display1">
                  {inviteCode}
                </DialogContentText>
              </Fragment>
            )}
            {!inviteCode && (
              <DialogContentText>
                This Chronicle is currently closed to new players. Click Make
                New Code to re-open.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleDisable}>Disable invitations</Button>
            <Button onClick={handleRegen}>Make new Code</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.chronicleId
  const chronicle = getSpecificChronicle(state, id)
  let chronicleName = ''
  let inviteCode = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
    inviteCode = chronicle.invite_code
  }

  return {
    id,
    chronicleName,
    inviteCode,
  }
}

export default connect(mapStateToProps, {
  updateChronicle,
  regenChronicleInviteCode,
})(ChronicleInvitePopup)
