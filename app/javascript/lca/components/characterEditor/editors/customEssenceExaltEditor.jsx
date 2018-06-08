// @flow
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import ExcellencyEditor from './ExcellencyEditor.jsx'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import type { Character } from 'utils/flow-types'

function CustomEssenceExaltEditor({
  character,
  onChange,
  onBlur,
  onRatingChange,
  onCheck,
}: {
  character: Character,
  onChange: Function,
  onBlur: Function,
  onRatingChange: Function,
  onCheck: Function,
}) {
  // Mortals don't have 'exalt traits'
  if (character.type == 'Character') {
    return null
  }

  return (
    <BlockPaper>
      <Typography component="div">
        <TextField
          name="caste"
          value={character.caste}
          label={character.aspect ? 'Aspect' : 'Caste'}
          onChange={onChange}
          onBlur={onBlur}
          margin="dense"
        />&nbsp;&nbsp;
        <ExcellencyEditor character={character} onChange={onRatingChange} />
        <br />
        <TextField
          name="exalt_type"
          value={character.exalt_type}
          label="Type"
          onChange={onChange}
          onBlur={onBlur}
          margin="dense"
        />
        <br />
        Has Castes&nbsp;&nbsp;&nbsp;
        <FormControlLabel
          control={
            <Switch
              checked={character.aspect || false}
              name="aspect"
              onChange={onCheck}
            />
          }
          label="Has Aspects"
        />
      </Typography>

      <AbilitySelect
        name="favored_abilities"
        label="Favored Abilities"
        value={character.favored_abilities}
        onChange={onRatingChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}
export default CustomEssenceExaltEditor
