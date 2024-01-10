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
        label="Excellency"
        margin="dense"
        onChange={onChange}
        className={className}
        fullWidth
      >
        <MenuItem value="">No Excellency</MenuItem>
        <MenuItem value="dragonblood">Dragon-Blood</MenuItem>
        <MenuItem value="lunar">Lunar</MenuItem>
        <MenuItem value="sidereal">Sidereal</MenuItem>
        <MenuItem value="solar">Solar/Abyssal</MenuItem>
        <MenuItem value="liminal">Liminal</MenuItem>
      </TextField>
    )
  }
}

export default RangeSelect
