import { type TextFieldProps } from '@mui/material/TextField';

import { ListSubheader, MenuItem, TextField } from '@mui/material';

const DbAspectSelect = (props: TextFieldProps) => (
  <TextField
    variant="standard"
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
