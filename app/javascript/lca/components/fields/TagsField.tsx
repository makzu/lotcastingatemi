import {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from 'react'

import { TextField, type TextFieldProps } from '@mui/material'

import { useDebounce } from '@/hooks'

type Props = Omit<TextFieldProps, 'value' | 'children' | 'onChange'> & {
  value: string[]
  onChange: ChangeEventHandler<HTMLInputElement>
}

const TagsField = (props: Props) => {
  const { value, onChange, ...otherProps } = props
  const [localValue, setLocalValue] = useState<string[]>(value ?? [])

  const debouncedOnChange = useDebounce(onChange, 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .split(',')
      .map((e, i, arr) => (i === arr.length - 1 ? e : e.trim()))
      .filter((e) => e.length > 0)

    setLocalValue(val)
    const fakeEvent = e

    // @ts-expect-error Hack to allow string[] to be passed to onChange
    fakeEvent.target.value = val
    debouncedOnChange(fakeEvent)
  }

  return (
    <TextField
      {...otherProps}
      value={localValue}
      onChange={handleChange}
      variant="standard"
      margin={props.margin ?? 'none'}
    />
  )
}

export default TagsField
