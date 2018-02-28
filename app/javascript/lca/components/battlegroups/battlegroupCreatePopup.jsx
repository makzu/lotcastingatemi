import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { createBattlegroup } from '../../ducks/actions.js'

// TODO enable creating a battlegroup of a player's existing QC
class BattlegroupCreatePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      battlegroup: { name: '' },
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    this.setState({ battlegroup: { ...this.state.battlegroup, [e.target.name]: e.target.value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createBattlegroup(this.state.battlegroup)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { battlegroup } = this.state

    return <span>
      <Button onClick={ handleOpen }>Create New</Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Create New Battlegroup</DialogTitle>
        <DialogContent>
          <TextField name="name" value={ battlegroup.name }
            label="Name" margin="normal"
            onChange={ handleChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </span>
  }
}
BattlegroupCreatePopup.propTypes = {
  id: PropTypes.number.isRequired,
  createBattlegroup: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createBattlegroup: (char) => {
      dispatch(createBattlegroup(char))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattlegroupCreatePopup)
