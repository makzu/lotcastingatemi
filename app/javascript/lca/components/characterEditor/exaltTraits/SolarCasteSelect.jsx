// @flow
import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

type Props = { value: string, onChange: Function }
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
        data-cy="select-solar-caste"
      >
        <ListSubheader key="none" value="" disabled>
          Select a Caste
        </ListSubheader>
        <MenuItem value="dawn">Dawn</MenuItem>
        <MenuItem value="zenith">Zenith</MenuItem>
        <MenuItem value="twilight">Twilight</MenuItem>
        <MenuItem value="night">Night</MenuItem>
        <MenuItem value="eclipse">Eclipse</MenuItem>
      </TextField>
    )
  }
}

export default SolarCasteSelect
