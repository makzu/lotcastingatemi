// @flow
import { shouldUpdate } from 'recompose'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import { isUnequalByKeys } from 'utils'
import type { Character, Enhancer } from 'utils/flow-types'

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

type Props = {
  character: Character,
  onCheck: Function,
  onRatingChange: Function,
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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'is_sorcerer',
      'sorcerous_motes',
      'rituals',
    ]),
)

export default enhance(SorceryEditor)
