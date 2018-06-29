// @flow
import * as React from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import type { withMotePool } from 'utils/flow-types'

type Props = { character: withMotePool, onChange: Function }
const AnimaSelect = ({ character, onChange }: Props) => (
  <TextField
    select
    name="anima_level"
    value={character.anima_level}
    label="Anima"
    margin="dense"
    onChange={onChange}
    style={{ minWidth: '8em' }}
  >
    <MenuItem value={0}>Dim</MenuItem>
    <MenuItem value={1}>Glowing</MenuItem>
    <MenuItem value={2}>Burning</MenuItem>
    <MenuItem value={3}>Bonfire</MenuItem>
  </TextField>
)

export default AnimaSelect
