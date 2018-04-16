import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import ListAttributeEditor, { ListAttributeFieldsPropTypes } from '../../generic/ListAttributeEditor.jsx'
import { withIntimacies } from '../../../utils/propTypes'
import * as calc from '../../../utils/calculated'

function SpecialtyFields({ trait, character, onChange, onBlur, onRatingChange, classes }) {
  const { ability, context } = trait
  const abilities = calc.abilitiesWithRatings(character)
  const options = abilities.length === 0 ? [<MenuItem key="1" disabled>No Abilities with ratings &gt; 0</MenuItem>] : undefined

  return <Fragment>
    <AbilitySelect name="ability" value={ ability }
      label="Ability"
      onChange={ onRatingChange }
      abilities={ abilities }
      prependOptions={ options }
    />

    <TextField name="context" value={ context } className={ classes.nameField }
      label="Specialty" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />
  </Fragment>
}
SpecialtyFields.propTypes = ListAttributeFieldsPropTypes

const SpecialtyEditor = ({ character, onRatingChange }) => {
  return <BlockPaper>
    <ListAttributeEditor label="Specialties"
      character={ character } trait="specialties"
      Fields={ SpecialtyFields }
      newObject={{ context: 'New Specialty', ability: '' }}
      onChange={ onRatingChange }
    />
  </BlockPaper>
}
SpecialtyEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onRatingChange: PropTypes.func,
}

export default SpecialtyEditor
