// @flow
import React, { Component } from 'react'

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

export type Props = {
  trait: string,
  label: string,
  value: number,
  onChange: Function,
  min: number,
  max: number,
  margin?: 'none' | 'dense' | 'normal',
  narrow?: boolean,
  dontFocus?: boolean,
  classes: Object,
}

// TODO: Special fields for x/y resources like mote/willpower pools
class RatingField extends Component<Props, { value: number }> {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value }
  }

  static defaultProps = { min: 0, max: Infinity, }
  static getDerivedStateFromProps = (state, props) => ({ value: props.value })

  handleChange = (e: SyntheticInputEvent<>) => {
    const { min, max } = this.props
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
    const { trait, label, classes, narrow, min, max } = this.props
    const { handleChange, handleFocus } = this
    const { value } = this.state

    return <TextField className={ narrow ? classes.narrow : classes.field }
      type="number" name={ trait } label={ label } value={ value }
      inputProps={{ min: min, max: max }}
      onChange={ handleChange } margin={ this.props.margin || 'none' }
      onFocus={ handleFocus }
    />
  }
}

export default withStyles(styles)(RatingField)
