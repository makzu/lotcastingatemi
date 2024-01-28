import {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from 'react'

import {
  TextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

import { useDebounce } from '@/hooks'

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  'value' | 'children' | 'onChange'
> & {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const LcaTextField = (props: TextFieldProps) => {
  const { value, onChange, ...otherProps } = props
  const [localValue, setLocalValue] = useState<string>(value ?? '')

  const debouncedOnChange = useDebounce(onChange, 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

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
