// @flow
import React, { Fragment } from 'react'
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
import type { Character } from 'utils/flow-types'

const SorceryFields = (props: { trait: string } & ListAttributeFieldTypes) => {
  const { onChange, trait, classes } = props

  return (
    <Fragment>
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
    </Fragment>
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
      <Typography variant="title">Sorcery</Typography>

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
        <Fragment>
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
        </Fragment>
      )}
    </BlockPaper>
  )
}
export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(props.character, newProps.character, [
    'is_sorcerer',
    'sorcerous_motes',
    'rituals',
  ])
)(SorceryEditor)
