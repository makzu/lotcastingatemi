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

import { removePlayerFromChronicle } from '../../ducks/actions.js'

class RemovePlayerPopup extends React.Component {
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
    const { chronicleName, playerName } = this.props

    return <Fragment>
      <Button onClick={ handleOpen }>
        Remove ?
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Remove { playerName }?</DialogTitle>
        <DialogContent>
          <Typography>
            This will remove { playerName } and all of their characters from { chronicleName }.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } variant="raised" color="primary">Remove</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
RemovePlayerPopup.propTypes = {
  chronicleId: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  chronicleName: PropTypes.string,
  playerName: PropTypes.string,
  removePlayer: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  let chronicleName, playerName = ''

  const chronicle = state.entities.chronicles[ownProps.chronicleId]
  if (chronicle != undefined && chronicle.name != undefined) {
    chronicleName = chronicle.name
    playerName = state.entities.players[ownProps.playerId].display_name
  }

  return {
    chronicleName: chronicleName,
    playerName: playerName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removePlayer: (chronicleId, playerId) => {
      dispatch(removePlayerFromChronicle(chronicleId, playerId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemovePlayerPopup)
