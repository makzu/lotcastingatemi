import { Checkbox, FormControlLabel, Typography } from '@mui/material'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@/components/generic/ListAttributeEditor'
import RatingField from '@/components/generic/RatingField'
import TextField from '@/components/generic/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import type { Character } from '@/types'

export const SorceryFields = (
  props: { trait: string } & ListAttributeFieldTypes,
) => {
  const { onChange, trait, classes } = props
  return (
    <>
      <TextField
        name="ritual"
        value={trait}
        className={classes.nameField}
        label="Ritual"
        margin="dense"
        multiline
        fullWidth
        maxRows={10}
        onChange={onChange}
      />
    </>
  )
}
interface Props {
  character: Character
  onCheck: $TSFixMeFunction
  onRatingChange: $TSFixMeFunction
}

function SorceryEditor(props: Props) {
  const { character, onCheck, onRatingChange } = props
  return (
    <BlockPaper>
      <Typography variant="h6">Sorcery</Typography>

      <div>
        <FormControlLabel
          label="Is sorcerer"
          control={
            <Checkbox
              name="is_sorcerer"
              checked={character.is_sorcerer}
              onChange={onCheck}
            />
          }
        />

        {character.is_sorcerer && (
          <RatingField
            trait="sorcerous_motes"
            value={character.sorcerous_motes}
            label="Sorcerous Motes"
            margin="dense"
            onChange={onRatingChange}
          />
        )}
      </div>

      <div>
        <FormControlLabel
          label="Is necromancer"
          control={
            <Checkbox
              name="is_necromancer"
              checked={character.is_necromancer}
              onChange={onCheck}
            />
          }
        />
        {character.is_necromancer && (
          <RatingField
            trait="necromantic_motes"
            value={character.necromantic_motes}
            label="Necromantic Motes"
            margin="dense"
            onChange={onRatingChange}
          />
        )}
      </div>
      {(character.is_sorcerer || character.is_necromancer) && (
        <div>
          <ListAttributeEditor
            label="Shaping Rituals"
            character={character}
            trait="rituals"
            Fields={SorceryFields}
            newObject={''}
            onChange={onRatingChange}
            nonObject
          />
        </div>
      )}
    </BlockPaper>
  )
}

export default SorceryEditor
