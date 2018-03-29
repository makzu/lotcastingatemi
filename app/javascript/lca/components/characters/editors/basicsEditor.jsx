import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/RatingField.jsx'

import { ESSENCE_MIN, ESSENCE_MAX } from '../../../utils/constants.js'

function BasicsEditor(props) {
  const { character, onChange, onBlur, onRatingChange } = props

  return <BlockPaper>
    <TextField name="name" value={ character.name }
      label="Name" margin="dense"
      onChange={ onChange } onBlur={ onBlur } />&nbsp;&nbsp;

    <RatingField trait="essence" value={ character.essence }
      label="Essence" min={ ESSENCE_MIN } max={ ESSENCE_MAX }
      onChange={ onRatingChange } margin="dense"
    />
    <br />

    <TextField name="description" value={ character.description }
      label="Description" margin="dense"
      multiline fullWidth rows={ 2 } rowsMax={ 10 }
      onChange={ onChange } onBlur={ onBlur } />
  </BlockPaper>

}
BasicsEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
}

export default BasicsEditor
