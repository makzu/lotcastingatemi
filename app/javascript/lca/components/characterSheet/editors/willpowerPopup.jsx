import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import * as c from '../../../utils/constants.js'
import { updateCharacter } from '../../../actions'

class _WillpowerPopup extends React.Component {
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

    let val = parseInt(e.target.value)
    if (val > c.WILLPOWER_MAX)
      val = c.WILLPOWER_MAX
    else if (val < c.WILLPOWER_MIN)
      val = c.WILLPOWER_MIN

    this.setState({character: {... this.state.character, [e.target.name]: val}})
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
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    return(<div className="editor-wrap ability-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Willpower"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          <TextField name="willpower_temporary" value={ character.willpower_temporary }
            floatingLabelText="Temp"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          /
          <TextField name="willpower_permanent" value={ character.willpower_permanent }
            floatingLabelText="Perm"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
        </div>
      </Dialog>
    </div>)
  }
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
)(_WillpowerPopup)
