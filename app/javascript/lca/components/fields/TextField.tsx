import { ChangeEvent, ChangeEventHandler, useState } from 'react'

import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'

import { useDebounce } from '@/hooks'

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  'children' | 'onChange'
> & {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const LcaTextField = (props: TextFieldProps) => {
  const { value, onChange, ...otherProps } = props
  const [localValue, setLocalValue] = useState(value || '')

  const debouncedOnChange = useDebounce(onChange, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <TextField
      {...otherProps}
      variant="standard"
      value={localValue}
      margin={props.margin ?? 'none'}
      onChange={handleChange}
    />
  )
}

export default LcaTextField
