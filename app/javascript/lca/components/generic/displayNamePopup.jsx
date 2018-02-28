import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { updatePlayer } from '../../ducks/actions.js'

// TODO: Enable autofill for some example QCs?
class DisplayNamePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      player: { display_name: this.props.displayName, },
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ player: { display_name: newProps.displayName }})
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    this.setState({ player: { ...this.state.player, [e.target.name]: e.target.value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.updatePlayer(this.props.id, 'display_name', this.state.player.display_name)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { player } = this.state

    return <div>
      <div onClick={ handleOpen }>{ this.props.children }</div>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Change Display Name</DialogTitle>
        <DialogContent>
          <TextField name="display_name" value={ player.display_name }
            label="Name" margin="normal"
            onChange={ handleChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}
DisplayNamePopup.propTypes = {
  displayName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  updatePlayer: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id
  const displayName = state.entities.players[id].display_name || ''

  return {
    displayName,
    id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayer: (id, trait, value) => {
      dispatch(updatePlayer(id, trait, value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayNamePopup)
