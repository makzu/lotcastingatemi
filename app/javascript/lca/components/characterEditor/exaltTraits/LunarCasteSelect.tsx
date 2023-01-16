import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'

const LunarCasteSelect = (props: TextFieldProps) => (
  <TextField
    variant="standard"
    select
    {...props}
    data-cy="select-db-aspect"
    label="Caste"
    margin="dense"
    name="caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="full moon">Full Moon</MenuItem>
    <MenuItem value="changing moon">Changing Moon</MenuItem>
    <MenuItem value="no moon">No Moon</MenuItem>
    <MenuItem value="casteless">Casteless</MenuItem>
  </TextField>
)

export default LunarCasteSelect
