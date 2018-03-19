import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import { clamp } from '../../utils/'

const styles = theme => ({
  field: {
    marginRight: theme.spacing.unit,
    width: '4em',
  },
  narrow: {
    marginRight: theme.spacing.unit,
    width: '3em',
  },
})

// TODO Special fields for x/y resources like mote/willpower pools
class RatingField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      min: this.props.min || 0,
      max: this.props.max || Infinity,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.value,
      min: newProps.min || 0,
      max: newProps.max || Infinity,
    })
  }

  handleChange(e) {
    const { min, max } = this.state
    let value = clamp(parseInt(e.target.value), min, max)
    const fakeE = { target: { name: e.target.name, value: value }}

    this.props.onChange(fakeE)
  }

  handleFocus(e) {
    if (this.props.dontFocus)
      return

    e.target.select()
  }

  render() {
    const { trait, label, classes, narrow } = this.props
    const { handleChange, handleFocus } = this
    const { value, min, max } = this.state

    return <TextField className={ narrow ? classes.narrow : classes.field }
      type="number" name={ trait } label={ label } value={ value }
      inputProps={{ min: min, max: max }}
      onChange={ handleChange } margin={ this.props.margin || 'none' }
      onFocus={ handleFocus }
    />
  }
}

RatingField.propTypes = {
  trait: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  margin: PropTypes.string,
  narrow: PropTypes.bool,
  dontFocus: PropTypes.bool,
  classes: PropTypes.object,
}

export default withStyles(styles)(RatingField)
