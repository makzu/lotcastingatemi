import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'

const SiderealCasteSelect = (props: TextFieldProps) => (
  <TextField
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
