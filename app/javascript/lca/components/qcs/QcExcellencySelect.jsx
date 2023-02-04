// @flow
import { PureComponent } from 'react'

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

type Props = {
  value: string,
  name: string,
  className?: any,
  onChange: Function,
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
