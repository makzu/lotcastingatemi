import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import AbilitySelect from '../../generic/abilitySelect.jsx'

import { prettyExaltType } from '../../../utils/calculated'
import { SOLAR_CASTE_ABILITIES } from '../../../utils/constants.js'

import { updateCharacter } from '../../../ducks/actions.js'

export class ExaltEditorPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      character: this.props.character
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, character: this.props.character })
  }

  handleClose() {
    this.setState({ open: false })
  }

  onChange(name, e, key, value) {
    let val = value
    if ((name == 'caste_abilities' || name == 'favored_abilities') && val.length > 5)
      val.shift()

    this.setState({ character: { ... this.state.character, [name]: val }})
  }

  render() {
    const character = this.state.character

    // Mortals don't have 'exalt traits'
    if (character.type == 'Character') {
      return null
    }

    const { handleOpen, handleClose, onChange } = this

    const actions = [
      <FlatButton
        key="close"
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    return(<div className="editor-wrap limit-editor-wrap">
      <FlatButton label={ `Edit ${prettyExaltType(character)} traits` } onClick={ handleOpen } />
      <Dialog
        title="Editing"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-basics">
          <SelectField name="caste" value={ character.caste }
            floatingLabelText="Caste"
            onChange={ onChange.bind(this, 'caste') }
          >
            <MenuItem value="dawn" primaryText="Dawn" />
            <MenuItem value="zenith" primaryText="Zenith" />
            <MenuItem value="twilight" primaryText="Twilight" />
            <MenuItem value="night" primaryText="Night" />
            <MenuItem value="eclipse" primaryText="Eclipse" />
          </SelectField>

          <AbilitySelect name="supernal_ability"
            floatingLabelText="Supernal Ability"
            value={ character.supernal_ability }
            abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
            onChange={ onChange.bind(this, 'supernal_ability') }
          />
          <br />
          <AbilitySelect name="caste_abilities"
            floatingLabelText="Caste Abilities"
            value={ character.caste_abilities }
            abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
            onChange={ onChange.bind(this, 'caste_abilities') }
            multiple={ true }
            fullWidth={ true }
          />
          <br />
          <AbilitySelect name="favored_abilities"
            floatingLabelText="Favored Abilities"
            value={ character.favored_abilities }
            multiple={ true }
            onChange={ onChange.bind(this, 'favored_abilities') }
            fullWidth={ true }
          />
        </div>
      </Dialog>
    </div>)
  }
}

ExaltEditorPopup.propTypes = {
  character: PropTypes.object.isRequired,
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
)(ExaltEditorPopup)
