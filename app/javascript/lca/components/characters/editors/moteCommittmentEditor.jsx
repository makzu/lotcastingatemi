// @flow
import React, { Fragment } from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import type { Character } from 'utils/flow-types'

function CommitFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, onBlur, onRatingChange, classes } = props
  const { pool, label, motes } = trait

  return (
    <Fragment>
      <TextField
        select
        name="pool"
        value={pool}
        className={classes.withMargin}
        label="Pool"
        margin="dense"
        onChange={onRatingChange}
      >
        <MenuItem value="personal">Pers</MenuItem>
        <MenuItem value="peripheral">Peri</MenuItem>
      </TextField>

      <TextField
        name="label"
        value={label}
        className={classes.nameField}
        label="For"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />

      <RatingField
        trait="motes"
        value={motes}
        label="Motes"
        min={0}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
    </Fragment>
  )
}

type Props = { character: Character, onChange: Function }
const MoteCommittmentEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Mote Committments"
      character={character}
      trait="motes_committed"
      Fields={CommitFields}
      newObject={{ pool: 'peripheral', label: '', motes: 0 }}
      onChange={onChange}
    />
  )
}

export default MoteCommittmentEditor
