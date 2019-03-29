import * as React from 'react'

import { MenuItem, TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'
import { Timing } from 'types/_lib'

interface Props {
  value: Timing | Timing[]
  name: string
  SelectProps?: { multiple: true }
  onChange: TextFieldProps['onChange']
  fullWidth: TextFieldProps['fullWidth']
}

const CharmTimingSelect = (props: Props) => (
  <TextField select label="Type" margin="dense" {...props}>
    <MenuItem value="simple">Simple</MenuItem>
    <MenuItem value="supplemental">Supplemental</MenuItem>
    <MenuItem value="reflexive">Reflexive</MenuItem>
    <MenuItem value="supplemental/reflexive">
      Supplemental or Reflexive
    </MenuItem>
    <MenuItem value="permanent">Permanent</MenuItem>
  </TextField>
)

export default CharmTimingSelect
