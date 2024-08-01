import {
  TextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type HTMLAttributes,
} from 'react'

import { useDebounce } from '@/hooks'

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  'value' | 'children' | 'onChange'
> & {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  nameField?: boolean
  debounceDelay?: number
  id: HTMLAttributes<'id'>
}

const nameProps: MuiTextFieldProps['inputProps'] = {
  autoComplete: 'off',
  'data-1p-ignore': 'true',
  'data-lp-ignore': 'true',
}

const LcaTextField = (props: TextFieldProps) => {
  const { value, onChange, nameField, debounceDelay, ...otherProps } = props
  const [localValue, setLocalValue] = useState<string>(value ?? '')

  const debouncedOnChange = useDebounce(onChange, debounceDelay ?? 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <TextField
      {...(nameField ? { inputProps: nameProps } : {})}
      {...otherProps}
      variant="standard"
      value={localValue}
      margin={props.margin ?? 'none'}
      onChange={handleChange}
    />
  )
}

export default LcaTextField
