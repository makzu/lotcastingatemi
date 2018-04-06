import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import ListAttributeEditor, { ListAttributeFieldsPropTypes } from '../../generic/ListAttributeEditor.jsx'
import RatingField from '../../generic/RatingField.jsx'
import { fullChar } from '../../../utils/propTypes'

function CommitFields({ trait, onChange, onBlur, onRatingChange, classes }) {
  const { pool, label, motes } = trait

  return <Fragment>
    <TextField select name="pool" value={ pool } className={ classes.withMargin }
      label="Pool" margin="dense"
      onChange={ onRatingChange }
    >
      <MenuItem value="personal">Pers</MenuItem>
      <MenuItem value="peripheral">Peri</MenuItem>
    </TextField>

    <TextField name="label" value={ label } className={ classes.nameField }
      label="For" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />

    <RatingField trait="motes" value={ motes }
      label="Motes" min={ 0 } margin="dense" narrow
      onChange={ onRatingChange }
    />
  </Fragment>
}
CommitFields.propTypes = ListAttributeFieldsPropTypes

const MoteCommittmentEditor = ({ character, onChange }) => {
  return <ListAttributeEditor label="Mote Committments"
    character={ character } trait="motes_committed"
    Fields={ CommitFields }
    newObject={{ pool: 'peripheral', label: '', motes: 0 }}
    onChange={ onChange }
  />
}
MoteCommittmentEditor.propTypes = {
  character: PropTypes.shape(fullChar),
  onChange: PropTypes.func
}

export default MoteCommittmentEditor
