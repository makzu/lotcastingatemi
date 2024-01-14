import { type TextFieldProps } from '@mui/material/TextField';

import { ListSubheader, MenuItem, TextField } from '@mui/material';

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
