import { MenuItem, TextField, type TextFieldProps } from '@mui/material'

import type { QC } from '@/types'

interface Props extends Omit<TextFieldProps, 'children'> {
  value: QC['excellency']
  name: string
}

const QcExcellencySelect = (props: Props) => {
  const { ...otherProps } = props

  return (
    <TextField
      variant="standard"
      select
      label="Excellency"
      margin="dense"
      fullWidth
      {...otherProps}
    >
      <MenuItem value="">No Excellency</MenuItem>
      <MenuItem value="dragonblood">Dragon-Blood</MenuItem>
      <MenuItem value="lunar">Lunar</MenuItem>
      <MenuItem value="sidereal">Sidereal</MenuItem>
      <MenuItem value="solar">Solar/Abyssal</MenuItem>
      <MenuItem value="liminal">Liminal</MenuItem>
    </TextField>
  )
}

export default QcExcellencySelect
