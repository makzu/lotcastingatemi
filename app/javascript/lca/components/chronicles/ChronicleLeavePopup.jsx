import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import { removePlayerFromChronicle } from '../../ducks/actions.js'
import { getSpecificChronicle } from '../../selectors'

class ChronicleLeavePopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }


  handleSubmit() {
    this.setState({ open: false })
    this.props.removePlayer(this.props.chronicleId, this.props.playerId)
  }

  render() {
    const { handleOpen, handleClose, handleSubmit } = this
    const { chronicleName } = this.props

    return <Fragment>
      <Button onClick={ handleOpen }>
        Leave Chronicle
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Leave { chronicleName }?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove you and all of your characters from { chronicleName }.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } variant="raised" color="primary">Leave</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
ChronicleLeavePopup.propTypes = {
  chronicleId: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  chronicleName: PropTypes.string,
  removePlayer: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    removePlayer: (chronicleId, playerId) => {
      dispatch(removePlayerFromChronicle(chronicleId, playerId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChronicleLeavePopup)
