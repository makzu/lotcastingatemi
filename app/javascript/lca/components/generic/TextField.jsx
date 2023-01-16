// @flow
import React, { Component } from 'react'

import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'

const styles = (theme) => ({
  root: {
    marginRight: theme.spacing(),
  },
})

type Props = {
  name: string,
  label: string,
  value: string,
  onChange: Function,
  margin?: 'none' | 'dense' | 'normal',
  className?: string,
  classes: Object,
}
type State = { value: string, oldValue: string }
class LcaTextField extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      oldValue: this.props.value,
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    if (state.oldValue === props.value) return null

    return { value: props.value, oldValue: props.value }
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    this.setState({ value: e.target.value })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    let val = e.target.value

    this.setState({ value: val })
    const updateObj = { target: { name: e.target.name, value: val } }
    this.props.onChange(updateObj)
  }

  render() {
    const { name, label, classes, className } = this.props
    const { handleChange, handleBlur } = this
    const { value } = this.state

    return (
      <TextField
        {...this.props}
        className={className || classes.root}
        name={name}
        label={label}
        value={value || ''}
        onChange={handleChange}
        margin={this.props.margin || 'dense'}
        onBlur={handleBlur}
      />
    )
  }
}

export default withStyles(styles)(LcaTextField)
