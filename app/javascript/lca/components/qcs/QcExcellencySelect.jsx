// @flow
import * as React from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

type Props = {
  value: string,
  name: string,
  className?: any,
  onChange: Function,
}
class RangeSelect extends React.PureComponent<Props> {
  render() {
    const { name, value, onChange, className } = this.props
    const options: React.Node = [
      <MenuItem key="" value="">
        No Excellency
      </MenuItem>,
      <MenuItem key="dragonblood" value="dragonblood">
        Dragon-Blood
      </MenuItem>,
      <MenuItem key="lunar" value="lunar">
        Lunar
      </MenuItem>,
      <MenuItem key="sidereal" value="sidereal">
        Sidereal
      </MenuItem>,
      <MenuItem key="solar" value="solar">
        Solar/Abyssal
      </MenuItem>,
      <MenuItem key="liminal" value="liminal">
        Liminal
      </MenuItem>,
    ]

    return (
      <TextField
        select
        name={name}
        value={value}
        label="Excellency"
        margin="dense"
        onChange={onChange}
        className={className}
      >
        {options}
      </TextField>
    )
  }
}

export default RangeSelect
