// @flow
import React from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import type { withMotePool } from 'utils/flow-types'

type Props = { character: withMotePool, onChange: Function }
const AnimaSelect = ({ character, onChange }: Props) => {
  return (
    <TextField
      select
      name="anima_level"
      value={character.anima_level}
      label="Anima"
      margin="dense"
      onChange={onChange}
    >
      <MenuItem value={0}>Dim</MenuItem>
      <MenuItem value={1}>Glowing</MenuItem>
      <MenuItem value={2}>Burning</MenuItem>
      <MenuItem value={3}>Bonfire</MenuItem>
    </TextField>
  )
}
export default AnimaSelect
