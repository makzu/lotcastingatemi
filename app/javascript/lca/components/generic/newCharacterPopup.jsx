import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { createCharacter } from '../../ducks/actions.js'

class NewCharacterPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      character: { name: '', type: 'Character' },
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
    this.setState({ character: { ...this.state.character, [e.target.name]: value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createCharacter(this.state.character)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { character } = this.state

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
      <ListItem primaryText="New Character"
        rightIcon={ <ActionNoteAdd /> }
        onTouchTap={ handleOpen }
      />
      <Dialog title="Create new character"
        open={ this.state.open }
        actions={ actions }
        onRequestClose={ handleClose }
      >
        <TextField name="name" value={ character.name }
          floatingLabelText="Name:"
          className="editor-name-field"
          onChange={ handleChange }
        />
        <br />
        <RadioButtonGroup name="type" valueSelected={ character.type }>
          <RadioButton label="Mortal" value="Character" />
          <RadioButton label="Solar" value="SolarCharacter" />
        </RadioButtonGroup>
      </Dialog>
    </div>
  }
}
NewCharacterPopup.propTypes = {
  id: PropTypes.number.isRequired,
  createCharacter: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createCharacter: (char) => {
      dispatch(createCharacter(char))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCharacterPopup)
