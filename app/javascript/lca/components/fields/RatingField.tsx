import {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type FocusEvent,
} from 'react'

import {
  TextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

import { useDebounce } from '@/hooks'
import { nuClamp as clamp } from '@/utils'

const selectOnFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.target.select()
}

export type RatingFieldProps = Omit<
  MuiTextFieldProps,
  'value' | 'children' | 'onChange'
> & {
  value: number
  /** @default 0 */
  min?: number
  /** @default Infinity */
  max?: number
  /** @default 500 */
  debounceTime?: number
  onChange: ChangeEventHandler<HTMLInputElement>
}

const RatingField = (props: RatingFieldProps) => {
  const { value, onChange, debounceTime, ...otherProps } = props
  const [localValue, setLocalValue] = useState<number | '-' | ''>(value ?? 0)

  const min = props.min ?? 0
  const max = props.max ?? Infinity

  const debouncedOnChange = useDebounce(onChange, debounceTime ?? 500)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleBlur = () => {
    if (localValue === '-' || localValue === '') setLocalValue(value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (min < 0 && (e.target.value === '-' || e.target.value === '0-')) {
      setLocalValue('-')
      return
    }

    if (e.target.value === '') {
      setLocalValue('')
      return
    }

    let value = Number(e.target.value)
    if (isNaN(value)) {
      value = 0
    }
    value = clamp(value, min, max)

    setLocalValue(value)
    const fakeEvent = e
    fakeEvent.target.value = value.toString()
    debouncedOnChange(fakeEvent)
  }

  return (
    <TextField
      {...otherProps}
      value={localValue}
      onChange={handleChange}
      inputMode="numeric"
      inputProps={{
        min,
        'aria-valuemin': min,
        max,
        'aria-valuemax': max,
        step: 1,
        pattern: '-?[0-9]*',
      }}
      onFocus={selectOnFocus}
      onBlur={handleBlur}
      sx={{ width: '4em', ...props.sx }}
    />
  )
}

export default RatingField
