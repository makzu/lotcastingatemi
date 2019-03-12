// @flow
import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import type { Enhancer } from 'utils/flow-types'

const styles = theme => ({
  label: {
    ...theme.typography.caption,
    marginBottom: '-0.5em',
  },
})

type ExposedProps = {
  name: string,
  label: string,
  value: boolean,
  onChange: Function,
}
type Props = ExposedProps & {
  classes: Object,
}
class LcaCheckbox extends React.Component<Props> {
  handleCheck = (e, checked) => {
    const { name, onChange } = this.props

    onChange({ target: { name: name, value: checked } })
  }

  render() {
    const {
      name,
      value,
      // eslint-disable-next-line no-unused-vars
      onChange,
      ...others
    } = this.props
    const { handleCheck } = this

    return (
      <FormControlLabel
        labelPlacement="top"
        {...others}
        control={
          <Checkbox name={name} checked={value} onChange={handleCheck} />
        }
      />
    )
  }
}

const enhance: Enhancer<Props, ExposedProps> = withStyles(styles)

export default enhance(LcaCheckbox)
