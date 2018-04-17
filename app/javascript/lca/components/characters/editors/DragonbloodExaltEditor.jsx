// @flow
import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'

import { nonCasteAbilities } from '../../../utils/calculated'
import type { Character } from 'utils/flow-types'

function DragonbloodExaltEditor({ character, onRatingChange }: { character: Character, onRatingChange: Function }) {
  let caste_abilities = character.caste_abilities
  if (character.caste === 'water') {
    caste_abilities = caste_abilities.concat('martial arts').sort()
  }

  return <BlockPaper>
    <TextField select name="caste" value={ character.caste || '' }
      label="Aspect"
      margin="dense" style={{ width: '8em' }}
      onChange={ onRatingChange }
    >
      <MenuItem value="" disabled>Select an Aspect</MenuItem>
      <MenuItem value="air">Air</MenuItem>
      <MenuItem value="earth">Earth</MenuItem>
      <MenuItem value="fire">Fire</MenuItem>
      <MenuItem value="water">Water</MenuItem>
      <MenuItem value="wood">Wood</MenuItem>
    </TextField>

    <Typography style={{ marginTop: '0.5em', textTransform: 'capitalize' }}>
      Aspect Abilities: { caste_abilities.join(', ')}
    </Typography>

    <AbilitySelect name="favored_abilities"
      label="Favored Abilities"
      value={ character.favored_abilities }
      abilities={ nonCasteAbilities(character) }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
  </BlockPaper>
}
DragonbloodExaltEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onRatingChange: PropTypes.func,
}

export default DragonbloodExaltEditor
