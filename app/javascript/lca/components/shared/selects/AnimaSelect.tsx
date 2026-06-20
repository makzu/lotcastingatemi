import MenuItem from '@material-ui/core/MenuItem'
import TextField, { type TextFieldProps } from '@material-ui/core/TextField'

import type { WithSharedStats } from '@lca/types/shared.ts'

interface Props {
  character: WithSharedStats
  onChange: TextFieldProps['onChange']
}
const AnimaSelect = ({ character, onChange, ...props }: Props) => (
  <TextField
    select
    name="anima_level"
    value={character.anima_level}
    label="Anima"
    margin="dense"
    onChange={onChange}
    style={{ minWidth: '8em' }}
    {...props}
  >
    <MenuItem value={0}>Dim</MenuItem>
    <MenuItem value={1}>Glowing</MenuItem>
    <MenuItem value={2}>Burning</MenuItem>
    <MenuItem value={3}>Bonfire</MenuItem>
  </TextField>
)

export default AnimaSelect
