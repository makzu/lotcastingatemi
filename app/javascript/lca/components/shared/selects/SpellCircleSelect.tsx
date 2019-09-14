import * as React from 'react'

import { MenuItem, TextField } from '@material-ui/core'
import { Spell } from 'types'

interface Props {
  spell: Spell
  handleChange: () => void
}
const SpellCircleSelect = ({ spell, handleChange }: Props) => (
  <TextField
    select
    name="circle"
    label="Circle"
    margin="dense"
    value={spell.circle}
    onChange={handleChange}
  >
    <MenuItem value="terrestrial">Terrestrial</MenuItem>
    <MenuItem value="celestial">Celestial</MenuItem>
    <MenuItem value="solar">Solar</MenuItem>
  </TextField>
)

export default SpellCircleSelect
