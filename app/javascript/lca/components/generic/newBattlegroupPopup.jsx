import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { createBattlegroup } from '../../ducks/actions.js'

class NewBattlegroupPopup extends React.Component {
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

  handleChange(e, value) {
    this.setState({ battlegroup: { ...this.state.battlegroup, [e.target.name]: value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createBattlegroup(this.state.battlegroup)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { battlegroup } = this.state

    const actions = [
      <FlatButton
        key="close"
        label="Cancel"
        primary={ true }
        onTouchTap={ handleClose }
      />,
      <FlatButton
        key="save"
        label="Create"
        onTouchTap={ handleSubmit }
      />
    ]
    return <div>
      <ListItem primaryText="New Battlegroup"
        rightIcon={ <ActionNoteAdd /> }
        onTouchTap={ handleOpen }
      />
      <Dialog title="Create new battlegroup"
        open={ this.state.open }
        actions={ actions }
        onRequestClose={ handleClose }
      >
        <TextField name="name" value={ battlegroup.name }
          floatingLabelText="Name:"
          className="editor-name-field"
          onChange={ handleChange }
        />
      </Dialog>
    </div>
  }
}
NewBattlegroupPopup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NewBattlegroupPopup)
