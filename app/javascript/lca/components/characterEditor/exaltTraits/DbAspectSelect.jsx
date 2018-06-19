// @flow
import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const options: React.Node = [
  <ListSubheader key="none" value="" disabled>
    Select an Aspect
  </ListSubheader>,
  <MenuItem key="d" value="air">
    Air
  </MenuItem>,
  <MenuItem key="z" value="earth">
    Earth
  </MenuItem>,
  <MenuItem key="t" value="fire">
    Fire
  </MenuItem>,
  <MenuItem key="n" value="water">
    Water
  </MenuItem>,
  <MenuItem key="e" value="wood">
    Wood
  </MenuItem>,
]

type Props = {
  value: string,
  onChange: Function,
}
class DbAspectSelect extends React.PureComponent<Props> {
  render() {
    const { value, onChange } = this.props

    return (
      <TextField
        select
        {...this.props}
        name="caste"
        value={value}
        label="Aspect"
        margin="dense"
        onChange={onChange}
      >
        {options}
      </TextField>
    )
  }
}

export default DbAspectSelect
