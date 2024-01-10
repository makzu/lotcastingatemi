import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
interface Props {
  value: string
  name: string
  className?: any
  onChange: $TSFixMeFunction
}

class RangeSelect extends React.PureComponent<Props> {
  render() {
    const { name, value, onChange, className } = this.props
    return (
      <TextField
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
