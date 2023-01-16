import { MenuItem, TextField } from '@mui/material'

import { TextFieldProps } from '@mui/material/TextField'
import { ExaltType } from 'types'
import { WithAura } from 'types/shared'

interface HavingAura extends WithAura {
  type: ExaltType | 'qc'
}
interface Props extends Pick<TextFieldProps, 'onChange'> {
  character: HavingAura
}

const AuraSelect = ({ character, onChange, ...props }: Props) => (
  <TextField
    variant="standard"
    select
    name="aura"
    value={character.aura}
    label="Aura"
    margin="dense"
    style={{ width: '8em' }}
    onChange={onChange}
    {...props}
  >
    {character.type !== 'DragonbloodCharacter' && (
      <MenuItem value="">Does not use Aura</MenuItem>
    )}
    <MenuItem value="none">None</MenuItem>
    <MenuItem value="air">Air</MenuItem>
    <MenuItem value="earth">Earth</MenuItem>
    <MenuItem value="fire">Fire</MenuItem>
    <MenuItem value="water">Water</MenuItem>
    <MenuItem value="wood">Wood</MenuItem>
  </TextField>
)

export default AuraSelect
