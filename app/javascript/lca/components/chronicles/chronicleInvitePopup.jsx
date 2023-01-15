// @flow
import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { updateChronicle, regenChronicleInviteCode } from 'ducks/actions.js'
import { getSpecificChronicle } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  chronicleId: number,
}
type Props = ExposedProps & {
  inviteCode: string,
  chronicleName: string,
  updateChronicle: Function,
  regenChronicleInviteCode: Function,
}
type State = {
  open: boolean,
}

class ChronicleInvitePopup extends Component<Props, State> {
  state = { open: false }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleRegen = () => {
    this.props.regenChronicleInviteCode(this.props.chronicleId)
  }

  handleDisable = () => {
    this.props.updateChronicle(this.props.chronicleId, { invite_code: '' })
  }

  render() {
    const { handleOpen, handleClose, handleRegen, handleDisable } = this
    const { chronicleName, inviteCode } = this.props

    return (
      <>
        <Button onClick={handleOpen}>Invite Player</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Invite a Player</DialogTitle>
          <DialogContent>
            {inviteCode && (
              <>
                <DialogContentText paragraph>
                  Another player can join {chronicleName} if they have this
                  code.
                </DialogContentText>
                <DialogContentText variant="display1">
                  {inviteCode}
                </DialogContentText>
              </>
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
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  let chronicleName = ''
  let inviteCode = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
    inviteCode = chronicle.invite_code
  }

  return {
    chronicleName,
    inviteCode,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  updateChronicle,
  regenChronicleInviteCode,
})

export default enhance(ChronicleInvitePopup)
