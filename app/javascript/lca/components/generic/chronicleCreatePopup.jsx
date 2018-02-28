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

import { createChronicle } from '../../ducks/actions.js'

class ChronicleCreatePopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      chronicle: { name: '' },
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
    this.setState({ chronicle: { ...this.state.chronicle, name: e.target.value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createChronicle(this.state.chronicle)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicle } = this.state

    const actions = [

    ]
    return <span>
      <Button onClick={ handleOpen }>Create New</Button>
      <Dialog
        open={ this.state.open }
        actions={ actions }
        onClose={ handleClose }
      >
        <DialogTitle>Create New Chronicle</DialogTitle>
        <DialogContent>
          <TextField name="name" value={ chronicle.name }
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
ChronicleCreatePopup.propTypes = {
  id: PropTypes.number.isRequired,
  createChronicle: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createChronicle: (chronicle) => {
      dispatch(createChronicle(chronicle))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChronicleCreatePopup)
