import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'

import { nonCasteAbilities } from '../../../utils/calculated'
import { SOLAR_CASTE_ABILITIES } from '../../../utils/constants.js'

function SolarExaltEditor(props) {
  const { character, onRatingChange } = props
  let casteAbilities = SOLAR_CASTE_ABILITIES[character.caste] || []
  if (character.caste === 'dawn')
    casteAbilities = casteAbilities.slice(0, 4).concat([{ abil: 'abil_martial_arts', pretty: 'Martial Arts' }]).concat(casteAbilities.slice(4))

  const noOptionItem = character.caste == undefined ? <MenuItem disabled>Select a Caste</MenuItem> : undefined

  return <BlockPaper>
    <TextField select name="caste" value={ character.caste || '' }
      label="Caste"
      margin="dense" style={{ width: '8em' }}
      onChange={ onRatingChange }
    >
      <MenuItem value="" disabled>Select a Caste</MenuItem>
      <MenuItem value="dawn">Dawn</MenuItem>
      <MenuItem value="zenith">Zenith</MenuItem>
      <MenuItem value="twilight">Twilight</MenuItem>
      <MenuItem value="night">Night</MenuItem>
      <MenuItem value="eclipse">Eclipse</MenuItem>
    </TextField>
    &nbsp;&nbsp;

    <AbilitySelect name="supernal_ability"
      label="Supernal Ability"
      value={ character.supernal_ability || '' }
      abilities={ casteAbilities }
      prependOptions={ noOptionItem }
      onChange={ onRatingChange } margin="dense"
    />
    <br />

    <AbilitySelect name="caste_abilities"
      label="Caste Abilities"
      value={ character.caste_abilities }
      abilities={ casteAbilities }
      onChange={ onRatingChange }
      prependOptions={ noOptionItem }
      multiple fullWidth margin="dense"
    />
    <br />
    <AbilitySelect name="favored_abilities"
      label="Favored Abilities"
      value={ character.favored_abilities }
      abilities={ nonCasteAbilities(character) }
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
