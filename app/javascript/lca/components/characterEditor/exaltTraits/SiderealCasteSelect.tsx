import { type TextFieldProps } from '@mui/material/TextField';

import { ListSubheader, MenuItem, TextField } from '@mui/material';

const SiderealCasteSelect = (props: TextFieldProps) => (
  <TextField
    variant="standard"
    select
    {...props}
    name="caste"
    label="Caste"
    margin="dense"
    data-cy="select-sid-caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="journeys">Journeys</MenuItem>
    <MenuItem value="serenity">Serenity</MenuItem>
    <MenuItem value="battles">Battles</MenuItem>
    <MenuItem value="secrets">Secrets</MenuItem>
    <MenuItem value="endings">Endings</MenuItem>
  </TextField>
)

export default SiderealCasteSelect
