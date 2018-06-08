// @flow
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'

import { updatePlayer } from 'ducks/actions.js'
import { getSpecificPlayer } from 'selectors'

type Props = { displayName: string, id: number, updatePlayer: Function }
type State = { open: boolean, player: { display_name: string } }
class DisplayNamePopup extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      player: { display_name: this.props.displayName },
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.displayName === state.player.display_name) return null
    return { player: { display_name: props.displayName } }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = e => {
    this.setState({
      player: { ...this.state.player, [e.target.name]: e.target.value },
    })
  }

  handleSubmit = () => {
    this.setState({ open: false })
    this.props.updatePlayer(
      this.props.id,
      'display_name',
      this.state.player.display_name
    )
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { player } = this.state

    return (
      <Fragment>
        <ListItem button onClick={handleOpen}>
          <ListItemText
            primary={`Logged in as ${this.props.displayName}`}
            secondary="(click to change name)"
          />
        </ListItem>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Change Display Name</DialogTitle>
          <DialogContent>
            <TextField
              name="display_name"
              value={player.display_name}
              label="Name"
              margin="normal"
              style={{ minWidth: '30em' }}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  const id = state.session.id
  const displayName = getSpecificPlayer(state, id).display_name || ''

  return {
    displayName,
    id,
  }
}

export default connect(
  mapStateToProps,
  { updatePlayer }
)(DisplayNamePopup)
