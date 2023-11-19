import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const AbyssalCasteSelect = (props: TextFieldProps) => (
  <TextField
    select
    {...props}
    name="caste"
    label="Caste"
    margin="dense"
    data-cy="select-abyssal-caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="dusk">Dusk</MenuItem>
    <MenuItem value="midnight">Midnight</MenuItem>
    <MenuItem value="daybreak">Daybreak</MenuItem>
    <MenuItem value="day">Day</MenuItem>
    <MenuItem value="moonshadow">Moonshadow</MenuItem>
  </TextField>
)

export default AbyssalCasteSelect
