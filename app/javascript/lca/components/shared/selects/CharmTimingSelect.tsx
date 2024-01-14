import { MenuItem, TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import type { Timing } from '@/types/_lib'

interface Props extends Pick<TextFieldProps, 'onChange' | 'fullWidth'> {
  value: Timing | Timing[]
  name: string
  SelectProps?: { multiple: true }
}

const CharmTimingSelect = (props: Props) => {
  return (
    <TextField variant="standard" select label="type" margin="dense" {...props}>
      <MenuItem value="simple">Simple</MenuItem>
      <MenuItem value="supplemental">Supplemental</MenuItem>
      <MenuItem value="reflexive">Reflexive</MenuItem>
      <MenuItem value="supplemental/reflexive">Supplemental/Reflexive</MenuItem>
      <MenuItem value="permanent">Permanent</MenuItem>
    </TextField>
  )
}

export default CharmTimingSelect
