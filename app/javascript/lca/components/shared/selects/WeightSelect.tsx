import React from 'react'

import { makeStyles, MenuItem, TextField, Theme } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(),
    width: (p: Props) => (p.armor ? '7em' : '6em'),
  },
}))

type PropsUnion = 'name' | 'value' | 'onChange' | 'margin' | 'style'

interface Props extends Pick<TextFieldProps, PropsUnion> {
  armor?: boolean
}
const WeightSelect = (props: Props) => {
  const classes = useStyles(props)
  return (
    <TextField
      select
      label="Weight"
      name={props.name}
      value={props.value}
      className={classes.root}
      onChange={props.onChange}
      margin={props.margin || 'dense'}
      style={props.style}
    >
      {props.armor && <MenuItem value="unarmored">Unarmored</MenuItem>}
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="heavy">Heavy</MenuItem>
    </TextField>
  )
}

export default WeightSelect
