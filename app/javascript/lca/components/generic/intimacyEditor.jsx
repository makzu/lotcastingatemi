// @flow
import React, { Fragment } from 'react'

import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from './RatingField.jsx'
import {
  INTIMACY_RATING_MAX as MAX,
  INTIMACY_RATING_MIN as MIN,
} from 'utils/constants.js'
import type { withIntimacies } from 'utils/flow-types'

function IntimacyFields({
  trait,
  onChange,
  onBlur,
  onRatingChange,
  classes,
}: ListAttributeFieldTypes) {
  const { subject, rating, hidden } = trait

  return (
    <Fragment>
      <TextField
        name="subject"
        value={subject}
        className={classes.nameField}
        label="Subject"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />
      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
      <div className={classes.checkboxWrap}>
        <div className={classes.floatingLabel}>Hidden</div>
        <Checkbox
          name="hidden"
          checked={hidden}
          value={hidden}
          onChange={onRatingChange}
        />
      </div>
    </Fragment>
  )
}

type Props = { character: withIntimacies, onChange: Function }
const IntimacyEditor = ({ character, onChange }: Props) => {
  return (
    <div>
      <ListAttributeEditor
        label="Principles"
        character={character}
        trait="principles"
        Fields={IntimacyFields}
        newObject={{ subject: 'New Principle', rating: 1 }}
        onChange={onChange}
      />
      <ListAttributeEditor
        label="Ties"
        character={character}
        trait="ties"
        Fields={IntimacyFields}
        newObject={{ subject: 'New Tie ', rating: 1 }}
        onChange={onChange}
      />
    </div>
  )
}

export default IntimacyEditor
