import { Component, type ChangeEvent } from 'react'

import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { type Theme } from '@mui/material/styles'
import { createStyles, withStyles, type WithStyles } from '@mui/styles'

const styles = (theme: Theme) =>
  createStyles({
    field: {
      marginRight: theme.spacing(),
    },
  })

interface Props extends WithStyles<typeof styles> {
  trait: string
  label: string
  value: string[]
  onChange: TextFieldProps['onChange']
  margin?: 'none' | 'dense' | 'normal'
  fullWidth?: boolean
  className?: string
}
interface State {
  value: string
  oldValue: string
}

class TagsField extends Component<Props, State> {
  constructor(props: Props) {
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
  static getDerivedStateFromProps = (props: Props, state: State) => {
    const val = props.value.join(', ')
    if (state.oldValue === val) return null
    return {
      value: val,
      oldValue: val,
    }
  }
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    this.setState({
      value: value.toLowerCase(),
    })
  }
  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
        className={className ?? classes.field}
        name={trait}
        label={label}
        value={value}
        onChange={handleChange}
        margin={this.props.margin ?? 'dense'}
        onBlur={handleBlur}
        fullWidth={fullWidth}
      />
    )
  }
}

export default withStyles(styles)(TagsField)
