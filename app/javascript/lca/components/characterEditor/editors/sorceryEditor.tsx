import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'
import { Character } from '@/types'

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
        <>
          <RatingField
            trait="sorcerous_motes"
            value={character.sorcerous_motes}
            label="Sorcerous Motes"
            margin="dense"
            onChange={onRatingChange}
          />
          <br />
          <ListAttributeEditor
            label="Shaping Rituals"
            character={character}
            trait="rituals"
            Fields={SorceryFields}
            newObject={''}
            onChange={onRatingChange}
            nonObject
          />
        </>
      )}
    </BlockPaper>
  )
}

export default SorceryEditor
