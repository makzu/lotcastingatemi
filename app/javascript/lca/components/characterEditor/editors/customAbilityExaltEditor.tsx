import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import ExcellencyEditor from '../excellencies/'
import AbilitySelect from 'components/generic/abilitySelect'
import BlockPaper from 'components/generic/blockPaper'
import TextField from 'components/generic/TextField'
import { nonCasteAbilities } from 'utils/calculated'
import type { Character } from 'utils/flow-types'
interface Props {
  character: Character
  onChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
  onChangeMulti: $TSFixMeFunction
}

function CustomAbilityExaltEditor({
  character,
  onChange,
  onCheck,
  onChangeMulti,
}: Props) {
  return (
    <BlockPaper>
      <Typography component="div">
        <TextField
          name="caste"
          value={character.caste}
          label={character.aspect ? 'Aspect' : 'Caste'}
          helperText="(Optional)"
          onChange={onChange}
          margin="dense"
        />
        <ExcellencyEditor
          character={character}
          onChange={onChange}
          onChangeMulti={onChangeMulti}
        />
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