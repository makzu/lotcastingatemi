import { Checkbox, FormControlLabel, type Theme } from '@mui/material/'

import makeStyles from '@mui/styles/makeStyles'

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
  labelPlacement?: 'end'
}
const LcaCheckbox = ({ name, value, onChange, ...others }: Props) => {
  const classes = useStyles({})
  const handleCheck = (_: never, checked: boolean) => {
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
