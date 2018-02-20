import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  field: {
    width: '3.5em',
    //marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
})

// TODO Special fields for x/y resources like mote/willpower pools
function RatingField(props) {
  const { trait, label, onChange, value, classes } = props
  const min = props.min || 0
  const max = props.max || Infinity

  return <TextField className={ classes.field }
    type="number" inputProps={{ min: min, max: max }}
    name={ trait } label={ label } value={ value }
    onChange={ onChange } margin={ props.margin || 'none' }
  />
}

RatingField.propTypes = {
  trait: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  margin: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RatingField)
