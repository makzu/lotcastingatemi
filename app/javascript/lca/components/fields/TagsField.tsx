import { TextField, type TextFieldProps } from '@mui/material'
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FocusEvent,
  type HTMLAttributes,
  useEffect,
  useState,
} from 'react'

import { useDebounce } from '@/hooks'

type Props = Omit<TextFieldProps, 'value' | 'children' | 'onChange'> & {
  name: string
  value: string[]
  onChange: ChangeEventHandler<HTMLInputElement>
  id: HTMLAttributes<'id'>
}

const cleanValue = (value: string) => {
  return value
    .split(',')
    .map((e, i, arr) => (i === arr.length - 1 ? e : e.trim()))
    .filter((e) => e.length > 0)
}

const TagsField = (props: Props) => {
  const { value, onChange, ...otherProps } = props
  const [localValue, setLocalValue] = useState<string[]>(value ?? [])

  const debouncedOnChange = useDebounce(onChange, 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.endsWith(',')) {
      // @ts-expect-error Don't want to call onChange with trailing comma
      setLocalValue(e.target.value)
      debouncedOnChange.cancel()
      return
    }

    const val = cleanValue(e.target.value)
    setLocalValue(val)

    // @ts-expect-error OnChange should always be called with an array
    debouncedOnChange({ target: { name: props.name, value: val } })
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === localValue.join(',')) {
      return
    }
    debouncedOnChange.cancel()
    onChange({
      ...e,
      target: { ...e.target, name: props.name, value: e.target.value },
    })
  }

  return (
    <TextField
      {...otherProps}
      value={localValue}
      variant="standard"
      margin={props.margin ?? 'none'}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default TagsField
