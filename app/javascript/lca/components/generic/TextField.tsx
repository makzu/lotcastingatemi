import React, { Component } from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import {
  Theme,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginRight: theme.spacing(),
    },
  })

interface Props extends WithStyles<typeof styles> {
  name: string
  label: string
  value: string
  onChange: $TSFixMeFunction
  margin?: 'none' | 'dense' | 'normal'
  className?: string
  fullWidth?: TextFieldProps['fullWidth']
  multiline?: TextFieldProps['multiline']
  rowsMax?: TextFieldProps['rowsMax']
}
interface State {
  value: string
  oldValue: string
}

class LcaTextField extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: this.props.value,
      oldValue: this.props.value,
    }
  }

  static getDerivedStateFromProps = (props: Props, state: State) => {
    if (state.oldValue === props.value) return null
    return {
      value: props.value,
      oldValue: props.value,
    }
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    })
  }
  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value
    this.setState({
      value: val,
    })
    const updateObj = {
      target: {
        name: e.target.name,
        value: val,
      },
    }
    this.props.onChange(updateObj)
  }

  render() {
    const { name, label, classes, className } = this.props
    const { handleChange, handleBlur } = this
    const { value } = this.state
    return (
      <TextField
        {...this.props}
        className={className ?? classes.root}
        name={name}
        label={label}
        value={value ?? ''}
        onChange={handleChange}
        margin={this.props.margin ?? 'dense'}
        onBlur={handleBlur}
      />
    )
  }
}

export default withStyles(styles)(LcaTextField)
