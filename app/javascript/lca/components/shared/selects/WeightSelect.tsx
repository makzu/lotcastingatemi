import { MenuItem, TextField, type TextFieldProps } from '@mui/material'

import { type Character, type Weapon } from '@/types'

interface Props extends Omit<TextFieldProps, 'value' | 'children' | 'variant'> {
  value: Character['armor_weight'] | Weapon['weight']
  armor?: boolean
}

const WeightSelect = (props: Props) => {
  const { sx, margin, ...otherProps } = props

  return (
    <TextField
      variant="standard"
      select
      label="Weight"
      margin={margin ?? 'dense'}
      sx={{ width: props.armor ? '7em' : '6em', ...sx }}
      {...otherProps}
    >
      {props.armor && <MenuItem value="unarmored">Unarmored</MenuItem>}
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="heavy">Heavy</MenuItem>
    </TextField>
  )
}

export default WeightSelect
