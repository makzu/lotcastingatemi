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

import RatingField from '../../generic/ratingField.jsx'

import { ESSENCE_MIN, ESSENCE_MAX } from '../../../utils/constants.js'
import { clamp } from '../../../utils'
import { updateCharacter } from '../../../ducks/actions.js'

class BasicsEditorPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({ character: { ... this.state.character, [e.target.name]: e.target.value }})
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.updateChar(this.state.character.id, trait, this.state.character[trait])
  }

  handleRatingChange(e) {
    const trait = e.target.name
    const value = e.target.value
    this.setState({ character: { ... this.state.character, [trait]: value }})
    this.props.updateChar(this.state.character.id, trait, value)
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    return <span>
      <Button onClick={ handleOpen }>Edit Basic Info</Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>
          Editing { character.name }
        </DialogTitle>
        <DialogContent>
          <TextField name="name" value={ character.name }
            label="Name:"
            className="editor-name-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          <RatingField trait="essence" value={ character.essence }
            label="Essence:" min={ 1 } max={ 10 }
          />
          <br />

          <TextField name="description" value={ character.description }
            label="Description:"
            multiline={ true } fullWidth={ true }
            onChange={ handleChange } onBlur={ handleBlur } />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Close</Button>
        </DialogActions>
      </Dialog>
    </span>
  }
}
BasicsEditorPopup.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    essence: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  updateChar: PropTypes.func
}
function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BasicsEditorPopup)
