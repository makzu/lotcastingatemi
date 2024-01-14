import { FormControlLabel, Switch, Typography } from '@mui/material'

import type { Character } from '@/types'
import TextField from '@/components/generic/TextField'
import AbilitySelect from '@/components/generic/abilitySelect'
import BlockPaper from '@/components/shared/BlockPaper'
import { nonCasteAttributes } from '@/utils/calculated'
import ExcellencyEditor from '../excellencies/'

interface Props {
  character: Character
  onChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
  onChangeMulti: $TSFixMeFunction
}

function CustomAttributeExaltEditor({
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
        attributesOnly
        name="caste_attributes"
        label="Caste Attributes"
        value={character.caste_attributes}
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
      <br />

      <AbilitySelect
        attributesOnly
        name="favored_attributes"
        label="Favored Attributes"
        value={character.favored_attributes}
        attributes={nonCasteAttributes(character)}
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
        onChange={onChange}
        multiple
        fullWidth
        margin="dense"
      />
    </BlockPaper>
  )
}

export default CustomAttributeExaltEditor
