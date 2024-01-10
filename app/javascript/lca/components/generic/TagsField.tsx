import React, { Component } from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  field: {
    marginRight: theme.spacing(),
  },
})

interface Props {
  trait: string
  label: string
  value: string[]
  onChange: $TSFixMeFunction
  margin?: 'none' | 'dense' | 'normal'
  fullWidth?: boolean
  className?: string
  classes: Record<string, $TSFixMe>
}
interface State {
  value: string
  oldValue: string
}

class TagsField extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value.join(', '),
      oldValue: this.props.value.join(', '),
    }
  }

  static defaultProps = {
    min: 0,
    max: Infinity,
  }
  static getDerivedStateFromProps = (props: Props, state) => {
    const val = props.value.join(', ')
    if (state.oldValue === val) return null
    return {
      value: val,
      oldValue: val,
    }
  }
  handleChange = (e: React.SyntheticEvent) => {
    const { value } = e.target
    this.setState({
      value: value.toLowerCase(),
    })
  }
  handleBlur = (e: TextFieldProps['onBlur']) => {
    const val = e.target.value
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e !== '')
    this.setState({
      value: val.join(', '),
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
    const { trait, label, classes, fullWidth, className } = this.props
    const { handleChange, handleBlur } = this
    const { value } = this.state
    return (
      <TextField
        className={className || classes.field}
        name={trait}
        label={label}
        value={value}
        onChange={handleChange}
        margin={this.props.margin || 'dense'}
        onBlur={handleBlur}
        fullWidth={fullWidth}
      />
    )
  }
}

export default withStyles(styles)(TagsField)
