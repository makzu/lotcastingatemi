import { MenuItem, TextField } from '@material-ui/core'
import type { TextFieldProps } from '@material-ui/core/TextField'

import type { Timing } from '@lca/types/_lib'

interface Props extends Pick<TextFieldProps, 'onChange' | 'fullWidth'> {
  value: Timing | Timing[]
  name: string
  SelectProps?: { multiple: true }
}

const CharmTimingSelect = (props: Props) => {
  return (
    <TextField select label="Type" margin="dense" {...props}>
      <MenuItem value="simple">Simple</MenuItem>
      <MenuItem value="supplemental">Supplemental</MenuItem>
      <MenuItem value="reflexive">Reflexive</MenuItem>
      <MenuItem value="supplemental/reflexive">Supplemental/Reflexive</MenuItem>
      <MenuItem value="permanent">Permanent</MenuItem>
    </TextField>
  )
}

export default CharmTimingSelect
