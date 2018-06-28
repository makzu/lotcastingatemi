// @flow
import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginRight: theme.spacing.unit,
  },
})

type Props = {
  name: string,
  label: string,
  value: string,
  onChange: Function,
  onBlur: Function,
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
    this.props.onBlur(updateObj)
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
        value={value}
        onChange={handleChange}
        margin={this.props.margin || 'none'}
        onBlur={handleBlur}
      />
    )
  }
}

export default withStyles(styles)(LcaTextField)
