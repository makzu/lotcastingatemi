import { MenuItem, makeStyles, TextField } from '@material-ui/core'
import type { TextFieldProps } from '@material-ui/core/TextField'

import type { Spell } from '@lca/types'

interface Props extends Pick<TextFieldProps, 'onChange' | 'margin'> {
  spell: Spell
}

const useStyles = makeStyles((_theme) => ({
  root: {
    width: '12em',
  },
}))

const SpellCircleSelect = ({ spell, onChange, margin }: Props) => {
  const classes = useStyles()
  return (
    <TextField
      select
      name="circle"
      label="Circle"
      margin={margin || 'dense'}
      value={spell.circle}
      onChange={onChange}
      classes={classes}
    >
      <MenuItem value="terrestrial">Terrestrial</MenuItem>
      <MenuItem value="celestial">Celestial</MenuItem>
      <MenuItem value="solar">Solar</MenuItem>
      <MenuItem value="ivory">Ivory</MenuItem>
      <MenuItem value="shadow">Shadow</MenuItem>
      <MenuItem value="void">Void</MenuItem>
    </TextField>
  )
}

export default SpellCircleSelect
