import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/RatingField.jsx'

import { LIMIT_MAX } from '../../../utils/constants.js'

function LimitEditor(props) {
  const { character, onChange, onBlur, onRatingChange } = props

  return <BlockPaper>
    <Typography variant="title">
      Limit
    </Typography>

    <RatingField trait="limit" value={ character.limit }
      label="Current" max={ LIMIT_MAX }
      onChange={ onRatingChange } margin="dense"
    />
    <br />

    <TextField name="limit_trigger" value={ character.limit_trigger }
      label="Limit Trigger" margin="dense"
      multiline fullWidth rows={ 2 } rowsMax={ 5 }
      onChange={ onChange } onBlur={ onBlur } />
  </BlockPaper>

}
LimitEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
}


export default LimitEditor
