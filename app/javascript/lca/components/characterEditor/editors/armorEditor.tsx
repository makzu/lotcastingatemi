import { Stack, Typography } from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import PoolDisplay from '@/components/generic/PoolDisplay'
import TagsField from '@/components/generic/TagsField'
import TextField from '@/components/generic/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import LcaCheckbox from '@/components/shared/inputs/Checkbox'
import WeightSelect from '@/components/shared/selects/WeightSelect'
import type { Character } from '@/types'

interface Props {
  character: Character
  pools: Record<string, $TSFixMe>
  penalties: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
}

function ArmorEditor(props: Props) {
  const { character, pools, penalties, onChange, onCheck } = props
  return (
    <BlockPaper>
      <Typography variant="h6">Armor</Typography>

      <TextField
        label="Name"
        margin="dense"
        name="armor_name"
        value={character.armor_name}
        onChange={onChange}
        fullWidth
      />

      <Stack direction="row" spacing={1} useFlexGap>
        <WeightSelect
          armor
          name="armor_weight"
          value={character.armor_weight}
          onChange={onChange}
          margin="dense"
        />

        <LcaCheckbox
          label="Artifact"
          name="armor_is_artifact"
          value={character.armor_is_artifact}
          onChange={onCheck}
        />
      </Stack>

      <TagsField
        trait="armor_tags"
        label="Tags"
        fullWidth
        margin="dense"
        value={character.armor_tags}
        onChange={onChange}
      />

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        alignItems="flex-end"
        marginY={1}
      >
        <PoolDisplay staticRating pool={pools.soak} label="Soak" />
        {pools.hardness.total > 0 && (
          <PoolDisplay
            noSummary
            staticRating
            pool={pools.hardness}
            label="Hardness"
          />
        )}
        <PoolDisplay
          noSummary
          staticRating
          pool={{ total: -penalties.mobility }}
          label={penalties.mobility < 0 ? 'Mobility Bonus' : 'Mobility Penalty'}
        />
      </Stack>

      <Typography>Armor modifiers</Typography>
      <Stack direction="row" spacing={1} useFlexGap alignItems="flex-end">
        <RatingField
          name="bonus_soak"
          label="Soak"
          margin="dense"
          value={character.bonus_soak}
          min={-Infinity}
          onChange={onChange}
        />
        <RatingField
          name="bonus_hardness"
          label="Hardness"
          margin="dense"
          value={character.bonus_hardness}
          min={-Infinity}
          onChange={onChange}
        />
        <RatingField
          name="bonus_mobility_penalty"
          label="Mobility"
          margin="dense"
          value={character.bonus_mobility_penalty}
          min={-Infinity}
          onChange={onChange}
        />
      </Stack>
    </BlockPaper>
  )
}

export default ArmorEditor
