import React, { Fragment } from 'react'
import type { ListAttributeFieldTypes } from 'components/generic/ListAttributeEditor.jsx'
import ListAttributeEditor from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import type { withIntimacies } from 'utils/flow-types'

function ResourceFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, classes } = props
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
      />
      <RatingField
        trait="value"
        value={value}
        label="Value"
        min={0}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </Fragment>
  )
}

interface Props {
  character: withIntimacies
  onChange: $TSFixMeFunction
}

const ResourceEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Misc Resources"
      character={character}
      trait="resources"
      Fields={ResourceFields}
      newObject={{
        resource: 'New Resource',
        value: 0,
      }}
      onChange={onChange}
    />
  )
}

export default ResourceEditor
