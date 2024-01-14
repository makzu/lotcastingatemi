import { FormControlLabel, Switch, Typography } from '@mui/material'

import type { Character } from '@/types'
import TextField from '@/components/generic/TextField'
import AbilitySelect from '@/components/generic/abilitySelect'
import BlockPaper from '@/components/shared/BlockPaper'
import ExcellencyEditor from '../excellencies/'

interface Props {
  character: Character
  onChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
  onChangeMulti: $TSFixMeFunction
}

function CustomEssenceExaltEditor({
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
        name="favored_abilities"
        label="Favored Abilities"
        value={character.favored_abilities}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default CustomEssenceExaltEditor
