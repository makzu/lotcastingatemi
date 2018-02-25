import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import RatingField from '../../generic/ratingField.jsx'

import { ATTRIBUTE_MIN, ATTRIBUTE_MAX } from '../../../utils/constants.js'
import { clamp } from '../../../utils'
import { withAttributes } from '../../../utils/propTypes'

import { updateCharacter } from '../../../ducks/actions.js'

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
    const val = clamp(parseInt(e.target.value), ATTRIBUTE_MIN, ATTRIBUTE_MAX)

    this.setState({ character: { ... this.state.character, [e.target.name]: val }})
  }

  handleBlur(e) {
    const trait = e.target.name
    if (this.state.character[trait] == this.props.character[trait])
      return

    this.props.updateChar(this.state.character.id, trait, this.state.character[trait])
  }

  render() {
    const character = this.state.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    return <span>
      <Button onClick={ handleOpen }>Edit</Button>
      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Editing Attributes</DialogTitle>
        <div className="editor-popup editor-popup-attributes">
          <div className="attribute-set attribute-set-physical">
            <h3>Physical</h3>
            <RatingField trait="attr_strength" label="Strength"
              className="attribute-field"
              value={ character.attr_strength }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_dexterity" label="Dexterity"
              className="attribute-field"
              value={ character.attr_dexterity }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_stamina" label="Stamina"
              className="attribute-field"
              value={ character.attr_stamina }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>

          <div className="attribute-set attribute-set-social">
            <h3>Social</h3>
            <TextField name="attr_charisma" label="Charisma"
              className="attribute-field"
              value={ character.attr_charisma }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_manipulation" label="Manipulation"
              className="attribute-field"
              value={ character.attr_manipulation }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_appearance" label="Appearance"
              className="attribute-field"
              value={ character.attr_appearance }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>

          <div className="attribute-set attribute-set-mental">
            <h3>Mental</h3>
            <TextField name="attr_perception" label="Perception"
              className="attribute-field"
              value={ character.attr_perception }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_intelligence" label="Intelligence"
              className="attribute-field"
              value={ character.attr_intelligence }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
            <TextField name="attr_wits" label="Wits"
              className="attribute-field"
              value={ character.attr_wits }
              type="number" min={ 1 } max={ 5 }
              onChange={ handleChange } onBlur={ handleBlur }
            />
          </div>
        </div>
      </Dialog>
    </span>
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
