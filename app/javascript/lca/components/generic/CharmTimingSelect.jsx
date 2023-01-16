// @flow
import * as React from 'react'

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

type Props = {
  value: string,
  name: string,
  onChange: Function,
}
class CharmTimingSelect extends React.PureComponent<Props> {
  render() {
    const { name, value, onChange } = this.props

    return (
      <TextField
        variant="standard"
        select
        name={name}
        value={value}
        label="Type"
        margin="dense"
        onChange={onChange}
      >
        <MenuItem value="simple">Simple</MenuItem>
        <MenuItem value="supplemental">Supplemental</MenuItem>
        <MenuItem value="reflexive">Reflexive</MenuItem>
        <MenuItem value="supplemental/reflexive">
          Supplemental or Reflexive
        </MenuItem>
        <MenuItem value="permanent">Permanent</MenuItem>
      </TextField>
    )
  }
}

export default CharmTimingSelect
