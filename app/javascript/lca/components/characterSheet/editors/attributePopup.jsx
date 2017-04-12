import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import * as c from '../../../utils/constants.js'
import { withAttributes } from '../../../utils/propTypes'

import { updateCharacter } from '../../../actions'

// TODO include sample pools on side of popup
class AttributePopup extends React.Component {
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

    if (val > c.ATTRIBUTE_MAX) {
      val = c.ATTRIBUTE_MAX
    } else if (val < c.ATTRIBUTE_MIN) {
      val = c.ATTRIBUTE_MIN
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
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    return(<div className="editor-wrap attribute-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Attributes"
        className="editor-popup"
        actions={ actions }
        open={ this.state.open }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-attributes">
          <div className="attribute-set attribute-set-physical">
            <h3>Physical</h3>
            <TextField name="attr_strength" floatingLabelText="Strength"
              className="attribute-field"
              value={ character.attr_strength }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_dexterity" floatingLabelText="Dexterity"
              className="attribute-field"
              value={ character.attr_dexterity }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_stamina" floatingLabelText="Stamina"
              className="attribute-field"
              value={ character.attr_stamina }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>

          <div className="attribute-set attribute-set-social">
            <h3>Social</h3>
            <TextField name="attr_charisma" floatingLabelText="Charisma"
              className="attribute-field"
              value={ character.attr_charisma }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_manipulation" floatingLabelText="Manipulation"
              className="attribute-field"
              value={ character.attr_manipulation }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_appearance" floatingLabelText="Appearance"
              className="attribute-field"
              value={ character.attr_appearance }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>

          <div className="attribute-set attribute-set-mental">
            <h3>Mental</h3>
            <TextField name="attr_perception" floatingLabelText="Perception"
              className="attribute-field"
              value={ character.attr_perception }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_intelligence" floatingLabelText="Intelligence"
              className="attribute-field"
              value={ character.attr_intelligence }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_wits" floatingLabelText="Wits"
              className="attribute-field"
              value={ character.attr_wits }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
        </div>
      </Dialog>
    </div>)
  }
}
AttributePopup.propTypes = {
  character: PropTypes.shape(withAttributes).isRequired,
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
)(AttributePopup)
