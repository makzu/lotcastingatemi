import classnames from 'classnames'
import { Component, type SyntheticInputEvent } from 'react'

import { withStyles } from '@mui/styles'
import { clamp } from '@/utils/'

import { TextField } from '@mui/material'

const styles = (theme) => ({
  field: {
    marginRight: theme.spacing(),
    width: '4em',
  },
  narrow: {
    marginRight: theme.spacing(),
    width: '3em',
  },
})

interface Props {
  trait: string
  label: string
  value: number
  onChange: $TSFixMeFunction
  min?: number
  max?: number
  margin?: 'none' | 'dense' | 'normal'
  narrow?: boolean
  dontFocus?: boolean
  className?: string
  classes: Record<string, $TSFixMe>
}
interface State {
  value: number
  oldValue: number
} // TODO: Special fields for x/y resources like mote/willpower pools

class RatingField extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      oldValue: this.props.value,
    }
  }

  static defaultProps = {
    min: 0,
    max: Infinity,
  }
  static getDerivedStateFromProps = (props, state) => {
    if (state.oldValue === props.value) return null
    return {
      value: props.value,
      oldValue: props.value,
    }
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { min, max } = this.props

    if (isNaN(parseInt(e.target.value))) {
      // $FlowThisIsOkayISwear
      this.setState({
        value: e.target.value,
      })
      return
    }

    // $FlowThisIsOkayISwear
    const value = clamp(parseInt(e.target.value), min, max)
    const fakeE = {
      target: {
        name: e.target.name,
        value: value,
      },
    }
    if (isNaN(parseInt(this.state.value)))
      this.setState({
        oldValue: this.state.value,
      })
    this.props.onChange(fakeE)
  }

  handleFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (this.props.dontFocus) return
    e.target.select()
  }

  handleBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(this.state.value))) {
      // $FlowThisIsOkayISwear
      this.setState({
        value: Math.max(0, this.props.min),
      })
      this.props.onChange({
        // $FlowThisIsOkayISwear
        target: {
          name: e.target.name,
          value: Math.max(0, this.props.min),
        },
      })
    }
  }

  render() {
    const {
      trait,
      label,
      classes,
      narrow,
      min,
      max,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dontFocus,
      ...otherProps
    } = this.props
    const { handleChange, handleFocus, handleBlur } = this
    const { value } = this.state
    const className = classnames(
      narrow ? classes.narrow : classes.field,
      this.props.className,
    )
    return (
      <TextField
        {...otherProps}
        className={className}
        type="number"
        name={trait}
        label={label}
        value={value}
        inputProps={{
          min: min,
          max: max,
        }}
        onChange={handleChange}
        margin={this.props.margin || 'none'}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
}

export default withStyles(styles)(RatingField)
