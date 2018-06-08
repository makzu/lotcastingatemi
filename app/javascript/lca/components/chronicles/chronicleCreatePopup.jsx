// @flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'

import ContentAddCircle from '@material-ui/icons/AddCircle'

import { createChronicle } from 'ducks/actions.js'

type Props = { createChronicle: Function }
type State = { open: boolean, chronicle: { name: string } }
class ChronicleCreatePopup extends Component<Props, State> {
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

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    this.setState({
      chronicle: { ...this.state.chronicle, name: e.target.value },
    })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.createChronicle(this.state.chronicle)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicle } = this.state

    return (
      <Fragment>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <ContentAddCircle />
          </ListItemIcon>

          <ListItemText primary="Create New" />
        </ListItem>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Be the Storyteller of a new Chronicle</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              value={chronicle.name}
              label="Name"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default connect(
  undefined,
  { createChronicle }
)(ChronicleCreatePopup)
