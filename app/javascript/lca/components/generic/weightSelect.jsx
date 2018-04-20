// @flow
import React from 'react'

import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  field: {
    marginRight: theme.spacing.unit,
    width: '5.65em',
  },
  armor: {
    marginRight: theme.spacing.unit,
    width: '7em',
  },
})

type Props = {
  name: string,
  armor?: boolean,
  value: string,
  margin?: string,
  classes: Object,
  onChange: Function,
}
function WeightSelect(props: Props) {
  return (
    <TextField
      select
      label="Weight"
      name={props.name}
      value={props.value}
      className={props.armor ? props.classes.armor : props.classes.field}
      onChange={props.onChange}
      margin={props.margin || 'none'}
    >
      {props.armor && <MenuItem value="unarmored">Unarmored</MenuItem>}
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="heavy">Heavy</MenuItem>
    </TextField>
  )
}

export default withStyles(styles)(WeightSelect)
