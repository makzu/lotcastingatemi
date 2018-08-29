// @flow
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import ExcellencyEditor from './ExcellencyEditor.jsx'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import TextField from 'components/generic/TextField.jsx'
import { nonCasteAbilities } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

type Props = { character: Character, onChange: Function, onCheck: Function }
function CustomAbilityExaltEditor({ character, onChange, onCheck }: Props) {
  return (
    <BlockPaper>
      <Typography component="div">
        <TextField
          name="caste"
          value={character.caste}
          label={character.aspect ? 'Aspect' : 'Caste'}
          onChange={onChange}
          margin="dense"
        />
        <ExcellencyEditor character={character} onChange={onChange} />
        <br />
        <TextField
          name="exalt_type"
          value={character.exalt_type}
          label="Type"
          onChange={onChange}
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
        name="caste_abilities"
        label="Caste Abilities"
        value={character.caste_abilities || []}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
      <br />
      <AbilitySelect
        name="favored_abilities"
        label="Favored Abilities"
        value={character.favored_abilities}
        abilities={nonCasteAbilities(character)}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
      <AbilitySelect
        name="supernal_ability"
        label={character.supernal_ability ? 'Supernal Ability' : 'No Supernal'}
        prependOptions={<MenuItem value="">No Supernal</MenuItem>}
        value={character.supernal_ability || ''}
        onChange={onChange}
        margin="dense"
      />
    </BlockPaper>
  )
}

export default CustomAbilityExaltEditor
