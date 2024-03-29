// @flow
import React from 'react'
import { shouldUpdate } from 'recompose'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
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
        rowsMax={10}
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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'is_sorcerer',
      'is_necromancer',
      'sorcerous_motes',
      'necromantic_motes',
      'rituals',
    ]),
)

export default enhance(SorceryEditor)
