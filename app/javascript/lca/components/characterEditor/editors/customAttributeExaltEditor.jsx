// @flow
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import ExcellencyEditor from '../excellencies/'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import TextField from 'components/generic/TextField.jsx'
import { nonCasteAttributes } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

type Props = {
  character: Character,
  onChange: Function,
  onCheck: Function,
  onChangeMulti: Function,
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
