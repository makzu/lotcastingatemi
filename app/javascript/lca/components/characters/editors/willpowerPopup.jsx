import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { clamp } from '../../../utils/'
import { WILLPOWER_MIN, WILLPOWER_MAX } from '../../../utils/constants.js'
import { withWillpower } from '../../../utils/propTypes'
import { updateCharacter } from '../../../ducks/actions.js'

class WillpowerPopup extends React.Component {
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
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()

    const val = clamp(parseInt(e.target.value), WILLPOWER_MIN, WILLPOWER_MAX)

    this.setState({ character: { ... this.state.character, [e.target.name]: val }})
  }

  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.updateChar(this.state.character.id, trait, this.state.character[trait])
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    const actions = [
      <Button
        key="close"
        label="Close"
        primary={ true }
        onClick={ handleClose }
      />
    ]

    return <span>
      <Button onClick={ handleOpen }>Edit</Button>
      <Dialog
        title="Editing Willpower"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          <TextField name="willpower_temporary" value={ character.willpower_temporary }
            label="Temp"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          /
          <TextField name="willpower_permanent" value={ character.willpower_permanent }
            label="Perm"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
        </div>
      </Dialog>
    </span>
  }
}
WillpowerPopup.propTypes = {
  character: PropTypes.shape(withWillpower).isRequired,
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
)(WillpowerPopup)
