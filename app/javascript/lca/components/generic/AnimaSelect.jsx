import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

const AnimaSelect = ({ character, onChange }) => {
  return <TextField select name="anima_level" value={ character.anima_level }
    label="Anima" margin="dense"
    onChange={ onChange }
  >
    <MenuItem value={ 0 }>Dim</MenuItem>
    <MenuItem value={ 1 }>Glowing</MenuItem>
    <MenuItem value={ 2 }>Burning</MenuItem>
    <MenuItem value={ 3 }>Bonfire</MenuItem>
  </TextField>
}
AnimaSelect.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
export default AnimaSelect
