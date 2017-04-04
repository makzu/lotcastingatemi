import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { updateCharacter } from '../../../actions'

class _ArmorPopup extends React.Component {
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

    this.handleWeightChange = this.handleWeightChange.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(e) {
    e.preventDefault()
    let val = null

    if (e.target.type == 'number')
      val = parseInt(e.target.value)

    else if (e.target.type == 'checkbox') {
      val = ! this.state.character[e.target.name]
      this.props.updateChar(this.state.character.id, e.target.name, val)

    } else if (e.target.name == 'armor_tags') {
      val = e.target.value.split(',')
    } else
      val = e.target.value

    this.setState({ character: { ... this.state.character, [e.target.name]: val } })
  }

  handleWeightChange(e, key, value) {
    this.setState({ character: { ...this.state.character, armor_weight: value } })

    this.props.updateChar(this.state.character.id, 'armor_weight', value)
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
    const { handleOpen, handleClose, handleChange, handleBlur, handleWeightChange } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    // TODO show interesting calculated values here
    return(<div className="editor-wrap ability-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Armor"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-armor">
          <div>
            <TextField floatingLabelText="Name:"
              name="armor_name" value={ character.armor_name }
              onChange={ handleChange } onBlur={ handleBlur } />
          </div>
          <div>

            <SelectField name="weight" value={ character.armor_weight }
              floatingLabelText="Weight:"
              onChange={ handleWeightChange }
            >
              <MenuItem value="unarmored" primaryText="Unarmored" />
              <MenuItem value="light" primaryText="Light" />
              <MenuItem value="medium" primaryText="Medium" />
              <MenuItem value="heavy" primaryText="Heavy" />
            </SelectField>
          </div>

          <Checkbox label="Artifact?" name="armor_is_artifact" checked={ character.armor_is_artifact }
            onCheck={ handleChange } />

          <div>
            <TextField name="armor_tags" value={ character.armor_tags }
              floatingLabelText="Tags:"
              onChange={ handleChange } onBlur={ handleBlur } />
          </div>

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
)(_ArmorPopup)
