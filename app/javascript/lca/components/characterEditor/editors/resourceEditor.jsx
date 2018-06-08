// @flow
import React, { Fragment } from 'react'

import TextField from '@material-ui/core/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import type { withIntimacies } from 'utils/flow-types'

function ResourceFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, onBlur, onRatingChange, classes } = props
  const { resource, value } = trait

  return (
    <Fragment>
      <TextField
        name="resource"
        value={resource}
        className={classes.nameField}
        label="Resource"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />
      <RatingField
        trait="value"
        value={value}
        label="Value"
        min={0}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
    </Fragment>
  )
}

type Props = { character: withIntimacies, onChange: Function }
const ResourceEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Misc Resources"
      character={character}
      trait="resources"
      Fields={ResourceFields}
      newObject={{ resource: 'New Resource', value: 0 }}
      onChange={onChange}
    />
  )
}

export default ResourceEditor
