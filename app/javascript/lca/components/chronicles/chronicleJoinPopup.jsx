import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { ListItem, ListItemText } from 'material-ui/List'
import TextField from 'material-ui/TextField'

import GroupAdd from 'material-ui-icons/GroupAdd'

import { joinChronicle } from '../../ducks/actions.js'

class ChronicleJoinPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      code: '',
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
    this.setState({ code: e.target.value })
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.joinChronicle(this.state.code)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { code } = this.state

    return <Fragment>
      <ListItem button onClick={ handleOpen }>
        <ListItemText inset primary="Join" />
        <GroupAdd />
      </ListItem>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Join a Chronicle</DialogTitle>
        <DialogContent>
          <TextField name="code" value={ code }
            label="Invite Code" margin="normal" fullWidth
            onChange={ handleChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } variant="raised" color="primary">Join</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
ChronicleJoinPopup.propTypes = {
  id: PropTypes.number.isRequired,
  joinChronicle: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    joinChronicle: (code) => {
      dispatch(joinChronicle(code))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChronicleJoinPopup)
