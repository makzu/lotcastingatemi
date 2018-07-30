// @flow
import React from 'react'
import { shouldUpdate } from 'recompose'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import WeightSelect from 'components/generic/weightSelect.jsx'
import { isUnequalByKeys } from 'utils'
import type { withArmorStats as Character } from 'utils/flow-types'

type Props = { character: Character, onChange: Function, onCheck: Function }
function ArmorEditor(props: Props) {
  const { character, onChange, onCheck } = props

  // TODO: show interesting calculated values here
  // TODO: Enable customized soak/hardness/mobility penalty values
  return (
    <BlockPaper>
      <Typography variant="title">Armor</Typography>

      <TextField
        label="Name"
        margin="dense"
        name="armor_name"
        value={character.armor_name}
        onChange={onChange}
        fullWidth
      />
      <br />

      <WeightSelect
        armor
        name="armor_weight"
        value={character.armor_weight}
        onChange={onChange}
        margin="dense"
      />
      <br />

      <FormControlLabel
        label="Artifact"
        control={
          <Checkbox
            name="armor_is_artifact"
            checked={character.armor_is_artifact}
            onChange={onCheck}
          />
        }
      />
      <br />

      <TagsField
        trait="armor_tags"
        label="Tags"
        fullWidth
        value={character.armor_tags}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(props.character, newProps.character, [
    'armor_name',
    'armor_weight',
    'armor_tags',
    'armor_is_artifact',
  ])
)(ArmorEditor)
