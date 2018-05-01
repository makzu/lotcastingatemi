// @flow
import * as React from 'react'

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
  margin?: 'none' | 'dense' | 'normal',
  classes: Object,
  onChange: Function,
}
function WeightSelect(props: Props) {
  let options = []
  if (props.armor)
    options = options.concat([
      <MenuItem key="unarmored" value="unarmored">
        Unarmored
      </MenuItem>,
    ])
  options = options.concat([
    <MenuItem key="light" value="light">
      Light
    </MenuItem>,
    <MenuItem key="medium" value="medium">
      Medium
    </MenuItem>,
    <MenuItem key="heavy" value="heavy">
      Heavy
    </MenuItem>,
  ])
  return (
    <TextField
      select
      label="Weight"
      name={props.name}
      value={props.value}
      className={props.armor ? props.classes.armor : props.classes.field}
      onChange={props.onChange}
      margin={props.margin}
    >
      {options}
    </TextField>
  )
}

export default withStyles(styles)(WeightSelect)
