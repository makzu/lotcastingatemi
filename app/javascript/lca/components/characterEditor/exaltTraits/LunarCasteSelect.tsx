import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

interface Props {
  value: string
  onChange: () => void
  [x: string]: any
}

const LunarCasteSelect = ({ onChange, value, ...otherProps }: Props) => (
  <TextField
    select={true}
    {...otherProps}
    data-cy="select-db-aspect"
    label="Caste"
    margin="dense"
    name="caste"
    onChange={onChange}
    value={value}
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="full moon">Full Moon</MenuItem>
    <MenuItem value="changing moon">Changing Moon</MenuItem>
    <MenuItem value="no moon">No Moon</MenuItem>
    <MenuItem value="casteless">Casteless</MenuItem>
  </TextField>
)

export default LunarCasteSelect
