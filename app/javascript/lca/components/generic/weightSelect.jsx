// @flow
import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  field: {
    marginRight: theme.spacing(),
    width: '5.65em',
  },
  armor: {
    marginRight: theme.spacing(),
    width: '7em',
  },
})

type Props = {
  name: string,
  armor?: boolean,
  value: string,
  margin?: 'none' | 'dense' | 'normal',
  style?: Object,
  classes: Object,
  onChange: Function,
}
const WeightSelect = (props: Props) => (
  <TextField
    select
    label="Weight"
    name={props.name}
    value={props.value}
    className={props.armor ? props.classes.armor : props.classes.field}
    onChange={props.onChange}
    margin={props.margin}
    style={props.style}
  >
    {props.armor && <MenuItem value="unarmored">Unarmored</MenuItem>}
    <MenuItem value="light">Light</MenuItem>
    <MenuItem value="medium">Medium</MenuItem>
    <MenuItem value="heavy">Heavy</MenuItem>
  </TextField>
)

export default withStyles(styles)(WeightSelect)
