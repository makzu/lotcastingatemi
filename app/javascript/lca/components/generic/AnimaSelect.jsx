// @flow
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import type { withMotePool } from 'utils/flow-types'

type Props = { character: withMotePool, onChange: Function }
const AnimaSelect = ({ character, onChange, ...props }: Props) => (
  <TextField
    variant="standard"
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
