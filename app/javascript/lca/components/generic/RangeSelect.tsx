import { PureComponent } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import TextField, { type TextFieldProps } from '@material-ui/core/TextField'

class RangeSelect extends PureComponent<TextFieldProps> {
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
