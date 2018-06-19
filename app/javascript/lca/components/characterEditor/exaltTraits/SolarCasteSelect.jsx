// @flow
import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const options: React.Node = [
  <ListSubheader key="none" value="" disabled>
    Select a Caste
  </ListSubheader>,
  <MenuItem key="d" value="dawn">
    Dawn
  </MenuItem>,
  <MenuItem key="z" value="zenith">
    Zenith
  </MenuItem>,
  <MenuItem key="t" value="twilight">
    Twilight
  </MenuItem>,
  <MenuItem key="n" value="night">
    Night
  </MenuItem>,
  <MenuItem key="e" value="eclipse">
    Eclipse
  </MenuItem>,
]

type Props = {
  value: string,
  onChange: Function,
}
class SolarCasteSelect extends React.PureComponent<Props> {
  render() {
    const { value, onChange } = this.props

    return (
      <TextField
        select
        {...this.props}
        name="caste"
        value={value}
        label="Caste"
        margin="dense"
        onChange={onChange}
      >
        {options}
      </TextField>
    )
  }
}

export default SolarCasteSelect
