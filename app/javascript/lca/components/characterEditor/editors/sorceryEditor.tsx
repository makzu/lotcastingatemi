import React from 'react'
import { shouldUpdate } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import type { ListAttributeFieldTypes } from 'components/generic/ListAttributeEditor'
import ListAttributeEditor from 'components/generic/ListAttributeEditor'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import { isUnequalByKeys } from 'utils'
import type { Character, Enhancer } from 'utils/flow-types'
export const SorceryFields = (
  props: {
    trait: string
  } & ListAttributeFieldTypes,
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
        rowsMax={10}
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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'is_sorcerer',
      'sorcerous_motes',
      'rituals',
    ]),
)
export default enhance(SorceryEditor)
