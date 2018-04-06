import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

import ListAttributeEditor, { ListAttributeFieldsPropTypes } from '../../generic/ListAttributeEditor.jsx'
import RatingField from '../../generic/RatingField.jsx'
import { withIntimacies } from '../../../utils/propTypes'

function ResourceFields({ trait, onChange, onBlur, onRatingChange, classes }) {
  const { resource, value } = trait

  return <Fragment>
    <TextField name="resource" value={ resource } className={ classes.nameField }
      label="Resource" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />
    <RatingField trait="value" value={ value }
      label="Value" min={ 0 } margin="dense" narrow
      onChange={ onRatingChange }
    />
  </Fragment>
}
ResourceFields.propTypes = ListAttributeFieldsPropTypes

const ResourceEditor = ({ character, onChange }) => {
  return <ListAttributeEditor label="Misc Resources"
    character={ character } trait="resources"
    Fields={ ResourceFields }
    newObject={{ context: 'New Resource', value: 0 }}
    onChange={ onChange }
  />
}
ResourceEditor.propTypes = {
  character: PropTypes.shape(withIntimacies),
  onChange: PropTypes.func
}

export default ResourceEditor
