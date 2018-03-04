import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'

import { updateChronicle, regenChronicleInviteCode } from '../../ducks/actions.js'

class ChronicleInvitePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleRegen = this.handleRegen.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleRegen() {
    this.props.regenCode(this.props.id)
  }

  handleDisable() {
    this.props.updateChronicle(this.props.id, 'invite_code', '')
  }

  render() {
    const { handleOpen, handleClose, handleRegen, handleDisable } = this
    const { chronicleName, inviteCode } = this.props

    return <Fragment>
      <Button onClick={ handleOpen }>
        Invite Player
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Invite a Player</DialogTitle>
        <DialogContent>
          { inviteCode &&
            <Fragment>
              <Typography>
                Another player can join { chronicleName } if they have this code.
              </Typography>
              <Typography variant="display1" paragraph>
                { inviteCode }
              </Typography>
            </Fragment>
          }
          { !inviteCode &&
            <Typography>
              This Chronicle is currently closed to new players.  Click Make New
              Code to re-open.
            </Typography>
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Close</Button>
          <Button onClick={ handleDisable }>Disable invitations</Button>
          <Button onClick={ handleRegen }>Make new Code</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
ChronicleInvitePopup.propTypes = {
  id: PropTypes.number.isRequired,
  inviteCode: PropTypes.string.isRequired,
  chronicleName: PropTypes.string.isRequired,
  updateChronicle: PropTypes.func.isRequired,
  regenCode: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const id = state.session.id
  const chronicle = state.entities.chronicles[ownProps.chronicleId]
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

function mapDispatchToProps(dispatch) {
  return {
    updateChronicle: (id, trait, value) => {
      dispatch(updateChronicle(id, trait, value))
    },
    regenCode: (id) => {
      dispatch(regenChronicleInviteCode(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChronicleInvitePopup)
