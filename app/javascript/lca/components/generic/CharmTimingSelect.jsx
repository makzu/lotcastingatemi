// @flow
import * as React from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

type Props = {
  value: string,
  name: string,
  onChange: Function,
}
class CharmTimingSelect extends React.PureComponent<Props> {
  render() {
    const { name, value, onChange } = this.props
    const options: React.Node = [
      <MenuItem key="simple" value="simple">
        Simple
      </MenuItem>,
      <MenuItem key="supplemental" value="supplemental">
        Supplemental
      </MenuItem>,
      <MenuItem key="reflexive" value="reflexive">
        Reflexive
      </MenuItem>,
      <MenuItem key="permanent" value="permanent">
        Permanent
      </MenuItem>,
    ]
    return (
      <TextField
        select
        name={name}
        value={value}
        label="Type"
        margin="dense"
        onChange={onChange}
      >
        {options}
      </TextField>
    )
  }
}

export default CharmTimingSelect
