import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const DbAspectSelect = (props: TextFieldProps) => (
  <TextField
    select
    {...props}
    name="caste"
    label="Aspect"
    margin="dense"
    data-cy="select-db-aspect"
  >
    <ListSubheader key="none">Select an Aspect</ListSubheader>
    <MenuItem value="air">Air</MenuItem>
    <MenuItem value="earth">Earth</MenuItem>
    <MenuItem value="fire">Fire</MenuItem>
    <MenuItem value="water">Water</MenuItem>
    <MenuItem value="wood">Wood</MenuItem>
  </TextField>
)

export default DbAspectSelect
