import { MenuItem, TextField, type TextFieldProps } from '@mui/material'
import { type ChangeEventHandler } from 'react'

import type { AttackRange } from '@/types'

export interface Props
  extends Omit<TextFieldProps, 'value' | 'children' | 'onChange' | 'label'> {
  value: AttackRange
  onChange: ChangeEventHandler<HTMLInputElement>
}

const RangeSelect = (props: Props) => {
  const { name, value, onChange, margin, sx, ...otherProps } = props

  return (
    <TextField
      variant="standard"
      select
      sx={{ minWidth: '10ex', ...sx }}
      {...otherProps}
      name={name}
      value={value}
      label="Range"
      margin={margin ?? 'dense'}
      onChange={onChange}
    >
      <MenuItem value="close">Close</MenuItem>
      <MenuItem value="short">Short</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="long">Long</MenuItem>
      <MenuItem value="extreme">Extreme</MenuItem>
    </TextField>
  )
}

export default RangeSelect
