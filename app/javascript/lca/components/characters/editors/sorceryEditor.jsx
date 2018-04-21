// @flow
import React, { Fragment } from 'react'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import type { Character } from 'utils/flow-types'

const SorceryFields = (props: ListAttributeFieldTypes) => {
  const { onChange, onBlur, trait, classes } = props

  return (
    <Fragment>
      <TextField
        value={trait}
        className={classes.nameField}
        label="Ritual"
        margin="dense"
        multiline
        fullWidth
        rowsMax={10}
        onChange={onChange}
        onBlur={onBlur}
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
export default SorceryEditor
