import { Stack } from '@mui/material'

import RatingField from '@/components/fields/RatingField'
import TextField from '@/components/fields/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import LcaCheckbox from '@/components/shared/inputs/Checkbox'
import { useAppSelector } from '@/hooks'
import { canIDeleteCharacter } from '@/selectors'
import type { Character } from '@/types'
import { ESSENCE_MAX, ESSENCE_MIN } from '@/utils/constants'

interface Props {
  character: Character
  onChange: $TSFixMeFunction
  onRatingChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
}

const BasicsEditor = ({
  character,
  onChange,
  onRatingChange,
  onCheck,
}: Props) => {
  const showPublicCheckbox = useAppSelector((state) =>
    canIDeleteCharacter(state, character.id),
  )
  return (
    <>
      <BlockPaper>
        <Stack direction="row" spacing={1} useFlexGap alignItems="flex-end">
          <TextField
            name="name"
            value={character.name}
            label="Name"
            margin="dense"
            onChange={onChange}
            nameField
            sx={{ flex: 1 }}
          />

          <RatingField
            name="essence"
            value={character.essence}
            label="Essence"
            min={ESSENCE_MIN}
            max={ESSENCE_MAX}
            onChange={onRatingChange}
            margin="dense"
          />

          {showPublicCheckbox && (
            <LcaCheckbox
              label="Publicly Viewable"
              name="public"
              value={character.public}
              onChange={onCheck}
              labelPlacement="end"
            />
          )}
        </Stack>

        <TextField
          name="description"
          value={character.description}
          label="Description"
          margin="dense"
          multiline
          fullWidth
          rows={2}
          maxRows={10}
          onChange={onChange}
        />
      </BlockPaper>
    </>
  )
}

export default BasicsEditor
