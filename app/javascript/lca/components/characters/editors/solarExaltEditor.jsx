import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'

import { SOLAR_CASTE_ABILITIES } from '../../../utils/constants.js'

function SolarExaltEditor(props) {
  const { character, onRatingChange } = props

  // Mortals don't have 'exalt traits'
  if (character.type == 'Character') {
    return null
  }

  return <BlockPaper>
    <TextField select name="caste" value={ character.caste }
      label="Caste" margin="dense"
      onChange={ onRatingChange }
    >
      <MenuItem value="dawn">Dawn</MenuItem>
      <MenuItem value="zenith">Zenith</MenuItem>
      <MenuItem value="twilight">Twilight</MenuItem>
      <MenuItem value="night">Night</MenuItem>
      <MenuItem value="eclipse">Eclipse</MenuItem>
    </TextField>

    <AbilitySelect name="supernal_ability"
      label="Supernal Ability"
      value={ character.supernal_ability }
      abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
      onChange={ onRatingChange } margin="dense"
    />
    <br />

    <AbilitySelect name="caste_abilities"
      label="Caste Abilities"
      value={ character.caste_abilities }
      abilities={ SOLAR_CASTE_ABILITIES[character.caste] }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
    <br />
    <AbilitySelect name="favored_abilities"
      label="Favored Abilities"
      value={ character.favored_abilities }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
  </BlockPaper>
}
SolarExaltEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onRatingChange: PropTypes.func,
}

export default SolarExaltEditor
