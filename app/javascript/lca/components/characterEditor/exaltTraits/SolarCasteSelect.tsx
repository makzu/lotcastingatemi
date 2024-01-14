import { type TextFieldProps } from '@mui/material/TextField';

import { ListSubheader, MenuItem, TextField } from '@mui/material';

const SolarCasteSelect = (props: TextFieldProps) => (
  <TextField
    variant="standard"
    select
    {...props}
    name="caste"
    label="Caste"
    margin="dense"
    data-cy="select-solar-caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="dawn">Dawn</MenuItem>
    <MenuItem value="zenith">Zenith</MenuItem>
    <MenuItem value="twilight">Twilight</MenuItem>
    <MenuItem value="night">Night</MenuItem>
    <MenuItem value="eclipse">Eclipse</MenuItem>
  </TextField>
)

export default SolarCasteSelect
