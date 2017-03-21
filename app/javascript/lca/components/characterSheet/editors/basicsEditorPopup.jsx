import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { updateCharacter } from '../../../actions'

class _BasicsEditorPopup extends React.Component {
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
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()

    const val = parseInt(e.target.value)

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

    return(<div className="editor-wrap basics-editor-wrap">
      <FlatButton label="Edit Basic Info" onClick={ handleOpen } />
      <Dialog
        title="Editing"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-basics">
          <TextField name="name" value={ character.name }
            floatingLabelText="Name:"
            className="editor-name-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          <TextField name="essence" value={ character.essence }
            floatingLabelText="Essence:"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          <TextField name="description" value={ character.description }
            floatingLabelText="Description:"
            className="editor-description-field"
            multiLine={ true }
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
)(_BasicsEditorPopup)

