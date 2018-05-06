// @flow
import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  field: {
    marginRight: theme.spacing.unit,
  },
})

type Props = {
  trait: string,
  label: string,
  value: Array<string>,
  onChange: Function,
  onBlur: Function,
  margin?: 'none' | 'dense' | 'normal',
  fullWidth?: boolean,
  classes: Object,
}
type State = { value: string }
// TODO: Special fields for x/y resources like mote/willpower pools
class RatingField extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value.join(', '),
    }
  }

  static defaultProps = { min: 0, max: Infinity }
  static getDerivedStateFromProps = props => ({ value: props.value.join(', ') })

  handleChange = (e: SyntheticInputEvent<>) => {
    const { value } = e.target
    this.setState({ value: value.toLowerCase() })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    let val = e.target.value
      .split(',')
      .map(e => e.trim())
      .filter(e => e !== '')
    //eslint-disable-next-line
    //debugger
    this.setState({ value: val.join(', ') })
    const updateObj = { target: { name: e.target.name, value: val } }
    this.props.onChange(updateObj)
    this.props.onBlur(updateObj)
  }

  render() {
    const { trait, label, classes, fullWidth } = this.props
    const { handleChange, handleBlur } = this
    const { value } = this.state

    return (
      <TextField
        className={classes.field}
        name={trait}
        label={label}
        value={value}
        onChange={handleChange}
        margin={this.props.margin || 'none'}
        onBlur={handleBlur}
        fullWidth={fullWidth}
      />
    )
  }
}

export default withStyles(styles)(RatingField)
