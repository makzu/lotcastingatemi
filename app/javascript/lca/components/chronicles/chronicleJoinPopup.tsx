import { Component } from 'react'
import { connect } from 'react-redux'

import GroupAdd from '@mui/icons-material/GroupAdd'

import { joinChronicle } from '@/ducks/actions'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  ListItemIcon,
  ListItem,
  TextField,
} from '@mui/material'

interface Props {
  joinChronicle: Function
}
interface State {
  open: boolean
  code: string
}
class ChronicleJoinPopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      code: '',
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleChange = (e) => {
    this.setState({ code: e.target.value })
  }
  handleSubmit = () => {
    this.setState({
      open: false,
    })
    this.props.joinChronicle(this.state.code)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { code } = this.state
    return (
      <>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>

          <ListItemText primary="Join" />
        </ListItem>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Join a Chronicle</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              name="code"
              value={code}
              label="Invite Code"
              margin="normal"
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Join
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default connect(undefined, { joinChronicle })(ChronicleJoinPopup)
