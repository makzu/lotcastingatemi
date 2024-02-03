import { type ChangeEventHandler } from 'react'

import {
  Checkbox,
  FormControlLabel,
  type FormControlLabelProps,
} from '@mui/material/'

interface Props
  extends Pick<FormControlLabelProps, 'sx' | 'label' | 'labelPlacement'> {
  name: string
  value: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

const LcaCheckbox = ({ name, value, onChange, sx, ...others }: Props) => {
  return (
    <FormControlLabel
      labelPlacement="top"
      sx={{ typography: 'caption', marginBottom: '-0.5em', ...sx }}
      {...others}
      control={<Checkbox name={name} checked={value} onChange={onChange} />}
    />
  )
}

export default LcaCheckbox
