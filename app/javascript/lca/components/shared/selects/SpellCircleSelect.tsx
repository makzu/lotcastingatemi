import { MenuItem, TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'

import { Spell } from 'types'

interface Props extends Pick<TextFieldProps, 'onChange' | 'margin'> {
  spell: Spell
}
const SpellCircleSelect = ({ spell, onChange, margin }: Props) => (
  <TextField
    select
    name="circle"
    label="Circle"
    margin={margin || 'dense'}
    value={spell.circle}
    onChange={onChange}
  >
    <MenuItem value="terrestrial">Terrestrial</MenuItem>
    <MenuItem value="celestial">Celestial</MenuItem>
    <MenuItem value="solar">Solar</MenuItem>
  </TextField>
)

export default SpellCircleSelect
