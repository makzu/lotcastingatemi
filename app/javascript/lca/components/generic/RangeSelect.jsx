// @flow
import * as React from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

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
      <MenuItem key="close" value="close">
        Close
      </MenuItem>,
      <MenuItem key="short" value="short">
        Short
      </MenuItem>,
      <MenuItem key="medium" value="medium">
        Medium
      </MenuItem>,
      <MenuItem key="long" value="long">
        Long
      </MenuItem>,
      <MenuItem key="extreme" value="extreme">
        Extreme
      </MenuItem>,
    ]

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
        {options}
      </TextField>
    )
  }
}

export default RangeSelect
