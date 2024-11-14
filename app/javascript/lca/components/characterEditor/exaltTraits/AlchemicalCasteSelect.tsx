import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

const AlchemicalCasteSelect = (props: TextFieldProps) => (
  <TextField
    select
    {...props}
    data-cy="select-db-aspect"
    label="Caste"
    margin="dense"
    name="caste"
  >
    <ListSubheader key="none">Select a Caste</ListSubheader>
    <MenuItem key="orichalcum" value="orichalcum">Orichalcum</MenuItem>
    <MenuItem key="moonsilver" value="moonsilver">Moonsilver</MenuItem>
    <MenuItem key="starmetal" value="starmetal">Starmetal</MenuItem>
    <MenuItem key="jade" value="jade">Jade</MenuItem>
    <MenuItem key="soulsteel" value="soulsteel">Soulsteel</MenuItem>
    <MenuItem key="adamant" value="adamant">Adamant</MenuItem>
  </TextField>
)

export default AlchemicalCasteSelect
