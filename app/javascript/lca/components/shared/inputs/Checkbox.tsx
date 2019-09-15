import React from 'react'

import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Theme,
} from '@material-ui/core/'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    ...theme.typography.caption,
    marginBottom: '-0.5em',
  },
}))

interface Props {
  name: string
  label: string
  value: boolean
  onChange: (e: any) => void
}
const LcaCheckbox = ({ name, value, onChange, ...others }: Props) => {
  const classes = useStyles({})
  const handleCheck = (e, checked) => {
    onChange({ target: { name, value: checked } })
  }

  return (
    <FormControlLabel
      labelPlacement="top"
      classes={classes}
      {...others}
      control={<Checkbox name={name} checked={value} onChange={handleCheck} />}
    />
  )
}

export default LcaCheckbox
