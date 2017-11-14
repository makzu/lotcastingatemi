import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { clamp } from '../../../utils/'

import { updateCharacter } from '../../../ducks/actions.js'

export class LimitPopup extends React.Component {
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

    let val

    if (e.target.type == 'number') {
      val = clamp(parseInt(e.target.value), 0, 10)
    } else {
      val = e.target.value
    }

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
      <FlatButton
        key="close"
        label="Close"
        primary={ true }
        onClick={ handleClose }
      />
    ]

    return(<div className="editor-wrap limit-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-basics">
          <TextField name="limit" value={ character.limit }
            floatingLabelText="Limit:"
            type="number" min={ 0 } max={ 10 }
            className="editor-rating-field"
            onChange={ handleChange } onBlur={ handleBlur } />
          <br />
          <TextField name="limit_trigger" value={ character.limit_trigger }
            floatingLabelText="Limit Trigger:"
            className="editor-description-field"
            multiLine={ true }
            onChange={ handleChange } onBlur={ handleBlur } />
        </div>
      </Dialog>
    </div>)
  }
}

LimitPopup.propTypes = {
  character: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    limit_trigger: PropTypes.string.isRequired
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
)(LimitPopup)
