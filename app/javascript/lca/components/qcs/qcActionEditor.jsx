import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

import ListAttributeEditor, { ListAttributeFieldsPropTypes } from '../generic/ListAttributeEditor.jsx'
import RatingField from '../generic/RatingField.jsx'
import { fullQc } from '../../utils/propTypes'

function ActionFields({ trait, onChange, onBlur, onRatingChange, classes }) {
  const { action, pool } = trait

  return <Fragment>
    <TextField name="action" value={ action } className={ classes.nameField }
      label="Action" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />

    <RatingField trait="pool" value={ pool }
      label="Pool" min={ 1 } margin="dense"
      onChange={ onRatingChange }
    />
  </Fragment>
}
ActionFields.propTypes = ListAttributeFieldsPropTypes

const QcActionEditor = ({ qc, onChange }) => {
  return <div>
    <RatingField label="Senses" trait="senses" value={ qc.senses }
      onChange={ onChange }
    />

    <ListAttributeEditor label="Actions"
      character={ qc } trait="actions"
      Fields={ ActionFields }
      newObject={{ action: 'New Action', pool: 2 }}
      onChange={ onChange }
    />
  </div>
}
QcActionEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  onChange: PropTypes.func,
}

export default QcActionEditor
