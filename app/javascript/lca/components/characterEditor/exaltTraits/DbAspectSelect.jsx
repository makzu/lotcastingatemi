// @flow
import * as React from 'react'

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

type Props = { value: string, onChange: Function }
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
        data-cy="select-db-aspect"
      >
        <ListSubheader key="none" value="" disabled>
          Select an Aspect
        </ListSubheader>
        <MenuItem value="air">Air</MenuItem>
        <MenuItem value="earth">Earth</MenuItem>
        <MenuItem value="fire">Fire</MenuItem>
        <MenuItem value="water">Water</MenuItem>
        <MenuItem value="wood">Wood</MenuItem>
      </TextField>
    )
  }
}

export default DbAspectSelect
