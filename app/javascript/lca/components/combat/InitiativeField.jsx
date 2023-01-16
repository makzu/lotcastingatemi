// @flow
import React, { Component } from 'react'

import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'

const styles = (theme) => ({
  field: {
    marginRight: theme.spacing(),
    width: '3em',
  },
})

type Props = {
  value: number,
  onChange: Function,
  classes: Object,
}
type State = { value: number, oldValue: number }
// TODO: Special fields for x/y resources like mote/willpower pools
class RatingField extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value, oldValue: this.props.value }
  }

  static defaultProps = { min: 0, max: Infinity }
  static getDerivedStateFromProps = (props, state) => {
    if (state.oldValue === props.value) return null

    return { value: props.value, oldValue: props.value }
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    if (isNaN(parseInt(e.target.value))) {
      // $FlowThisIsOkayISwear
      this.setState({ value: e.target.value })
      return
    }

    this.setState({ value: parseInt(e.target.value) })
  }

  handleFocus = (e: SyntheticInputEvent<>) => {
    e.target.select()
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    if (isNaN(parseInt(this.state.value))) {
      this.setState({ value: 0 })
      this.props.onChange({ target: { name: e.target.name, value: 0 } })
    } else {
      this.props.onChange({
        target: { name: e.target.name, value: parseInt(this.state.value) },
      })
    }
  }

  render() {
    const { classes } = this.props
    const { handleChange, handleFocus, handleBlur } = this
    const { value } = this.state

    return (
      <TextField
        className={classes.field}
        type="number"
        name="initiative"
        label="Initiative"
        value={value}
        onChange={handleChange}
        margin="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
}

export default withStyles(styles)(RatingField)
