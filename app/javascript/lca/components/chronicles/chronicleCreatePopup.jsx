// @flow
import { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import ContentAddCircle from '@mui/icons-material/AddCircle'

import { createChronicle } from 'ducks/actions'

type Props = { createChronicle: Function }
type State = { open: boolean, chronicle: { name: string } }
class ChronicleCreatePopup extends PureComponent<Props, State> {
  state = {
    open: false,
    chronicle: { name: '' },
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
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
              variant="standard"
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default connect(undefined, { createChronicle })(ChronicleCreatePopup)
