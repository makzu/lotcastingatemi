// @flow
import React, { Fragment } from 'react'

import Checkbox from 'components/shared/inputs/Checkbox'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from './RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import {
  INTIMACY_RATING_MAX as MAX,
  INTIMACY_RATING_MIN as MIN,
} from 'utils/constants.js'
import type { withIntimacies } from 'utils/flow-types'

function IntimacyFields({ trait, onChange, classes }: ListAttributeFieldTypes) {
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
        inputProps={{ ['data-cy']: 'intimacy-subject' }}
      />
      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onChange}
      />

      <Checkbox
        name="hidden"
        label="Hidden"
        value={hidden || false}
        onChange={onChange}
      />
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
