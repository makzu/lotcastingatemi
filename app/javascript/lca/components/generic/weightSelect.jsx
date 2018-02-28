import React from 'react'
import PropTypes from 'prop-types'

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

function WeightSelect(props) {
  return <TextField select label="Weight" name={ props.name } value={ props.value }
    className={ props.armor ? props.classes.armor : props.classes.field }
    onChange={ props.onChange }
  >
    { props.armor &&
      <MenuItem value="unarmored">Unarmored</MenuItem>
    }
    <MenuItem value="light">Light</MenuItem>
    <MenuItem value="medium">Medium</MenuItem>
    <MenuItem value="heavy">Heavy</MenuItem>
  </TextField>
}

WeightSelect.propTypes = {
  name: PropTypes.string.isRequired,
  armor: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  narrow: PropTypes.bool,
  classes: PropTypes.object,
}

export default withStyles(styles)(WeightSelect)
