import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import TextField from 'material-ui/TextField'

import { createCharacter } from '../../ducks/actions.js'

// TODO: Enable autofill for some example QCs?
class CharacterCreatePopup extends React.Component {
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

  handleChange(e) {
    this.setState({ character: { ...this.state.character, [e.target.name]: e.target.value }})
  }

  handleSubmit() {
    this.setState({ open: false })
    this.props.createCharacter(this.state.character)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { character } = this.state

    return <span>
      <Button onClick={ handleOpen }>Create New</Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Create New Character</DialogTitle>
        <DialogContent>
          <TextField name="name" value={ character.name }
            label="Name" margin="normal"
            onChange={ handleChange }
          />
          <RadioGroup name="type"
            value={ character.type }
            onChange={ handleChange }
          >
            <FormControlLabel value="Character" control={ <Radio /> } label="Mortal" />
            <FormControlLabel value="SolarCharacter" control={ <Radio /> } label="Solar Exalt" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </span>
  }
}
CharacterCreatePopup.propTypes = {
  id: PropTypes.number.isRequired,
  createCharacter: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const id = state.session.id

  return { id }
}

function mapDispatchToProps(dispatch) {
  return {
    createCharacter: (character) => {
      dispatch(createCharacter(character))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreatePopup)
