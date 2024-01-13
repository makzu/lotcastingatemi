import { ChangeEvent, ChangeEventHandler, useState, FocusEvent } from 'react'

import { TextField, TextFieldProps as MuiTextFieldProps } from '@mui/material'

import { useDebounce } from '@/hooks'
import { nuClamp as clamp } from '@/utils'

const selectOnFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.target.select()
}

type RatingFieldProps = Omit<
  MuiTextFieldProps,
  'value' | 'children' | 'onChange'
> & {
  value: number
  /** @default 0 */
  min?: number
  /** @default Infinity */
  max?: number

  onChange: ChangeEventHandler<HTMLInputElement>
}

const RatingField = (props: RatingFieldProps) => {
  const { value, onChange, ...otherProps } = props
  const [localValue, setLocalValue] = useState<number | '-'>(value || 0)

  const min = props.min ?? 0
  const max = props.max ?? Infinity

  const debouncedOnChange = useDebounce(onChange, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if ((min < 0 && e.target.value === '-') || e.target.value === '0-') {
      setLocalValue('-')
      return
    }

    let value = Number(e.target.value)
    if (isNaN(value)) {
      value = 0
    }
    value = clamp(value, min, max)

    setLocalValue(value)
    debouncedOnChange(e)
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
      sx={{
        width: '4em',
        marginRight: 1,
        ...props.sx,
      }}
    />
  )
}

export default RatingField
