import { PureComponent } from 'react'

import { MenuItem, TextField } from '@mui/material'

interface Props {
  value: string
  name: string
  className?: $TSFixMe
  onChange: $TSFixMeFunction
}
class RangeSelect extends PureComponent<Props> {
  render() {
    const { name, value, onChange, className } = this.props
    return (
      <TextField
        variant="standard"
        select
        name={name}
        value={value}
        label="Range"
        margin="dense"
        onChange={onChange}
        className={className}
      >
        <MenuItem value="close">Close</MenuItem>
        <MenuItem value="short">Short</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="long">Long</MenuItem>
        <MenuItem value="extreme">Extreme</MenuItem>
      </TextField>
    )
  }
}

export default RangeSelect
