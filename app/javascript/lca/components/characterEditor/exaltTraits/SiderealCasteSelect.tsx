import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const SiderealCasteSelect = (props: TextFieldProps) => (
  <TextField
    select
    {...props}
    name="caste"
    label="Caste"
    margin="dense"
    data-cy="select-sid-caste"
  >
    <ListSubheader key="none">Select an Aspect</ListSubheader>
    <MenuItem value="journeys">Journeys</MenuItem>
    <MenuItem value="serenity">Serenity</MenuItem>
    <MenuItem value="battles">Battles</MenuItem>
    <MenuItem value="secrets">Secrets</MenuItem>
    <MenuItem value="endings">Endings</MenuItem>
  </TextField>
)

export default SiderealCasteSelect
