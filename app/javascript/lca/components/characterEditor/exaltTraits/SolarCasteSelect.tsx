import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const SolarCasteSelect = (props: TextFieldProps) => (
  <TextField
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
