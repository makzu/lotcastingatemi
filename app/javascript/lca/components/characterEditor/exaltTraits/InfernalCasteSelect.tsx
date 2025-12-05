import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const InfernalCasteSelect = (props: TextFieldProps) => (
  <TextField
    select
    {...props}
    name="caste"
    label="Caste"
    margin="dense"
    data-cy="select-infernal-caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem value="azimuth">Azimuth</MenuItem>
    <MenuItem value="ascendant">Ascendant</MenuItem>
    <MenuItem value="horizon">Horizon</MenuItem>
    <MenuItem value="nadir">Nadir</MenuItem>
    <MenuItem value="penumbra">Penumbra</MenuItem>
  </TextField>
)

export default InfernalCasteSelect
