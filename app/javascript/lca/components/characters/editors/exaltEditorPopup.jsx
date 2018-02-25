import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

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
    return <span />
    /*
    const character = this.state.character

    // Mortals don't have 'exalt traits'
    if (character.type == 'Character') {
      return null
    }

    const { handleOpen, handleClose, onChange } = this

    const actions = [
      <Button
        key="close"
        label="Close"
        primary={ true }
        onClick={ handleClose }
      />
    ]

    return <span>
      <Button label={ `Edit ${prettyExaltType(character)} traits` } onClick={ handleOpen } />
      <Dialog
        title="Editing"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-basics">
          <Select name="caste" value={ character.caste }
            label="Caste"
            onChange={ onChange.bind(this, 'caste') }
          >
            <MenuItem value="dawn" primarytext="Dawn" />
            <MenuItem value="zenith" primarytext="Zenith" />
            <MenuItem value="twilight" primarytext="Twilight" />
            <MenuItem value="night" primarytext="Night" />
            <MenuItem value="eclipse" primarytext="Eclipse" />
          </Select>

          <AbilitySelect name="supernal_ability"
            label="Supernal Ability"
            value={ character.supernal_ability }
            abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
            onChange={ onChange.bind(this, 'supernal_ability') }
          />
          <br />
          <AbilitySelect name="caste_abilities"
            label="Caste Abilities"
            value={ character.caste_abilities }
            abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
            onChange={ onChange.bind(this, 'caste_abilities') }
            multiple={ true }
            fullWidth={ true }
          />
          <br />
          <AbilitySelect name="favored_abilities"
            label="Favored Abilities"
            value={ character.favored_abilities }
            multiple={ true }
            onChange={ onChange.bind(this, 'favored_abilities') }
            fullWidth={ true }
          />
        </div>
      </Dialog>
    </span>*/
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
