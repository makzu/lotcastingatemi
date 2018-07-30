// @flow
import React from 'react'
import { shouldUpdate } from 'recompose'

import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { isUnequalByKeys } from 'utils'
import { LIMIT_MAX } from 'utils/constants.js'
import type { Character } from 'utils/flow-types'

type Props = { character: Character, onChange: Function }
function LimitEditor({ character, onChange }: Props) {
  return (
    <BlockPaper>
      <Typography variant="title">Limit</Typography>

      <RatingField
        trait="limit"
        value={character.limit}
        label="Current"
        max={LIMIT_MAX}
        onChange={onChange}
        margin="dense"
      />

      <TextField
        name="limit_trigger"
        value={character.limit_trigger}
        label="Limit Trigger"
        margin="dense"
        multiline
        fullWidth
        rows={2}
        rowsMax={5}
        onChange={onChange}
      />
    </BlockPaper>
  )
}
export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(props.character, newProps.character, [
    'limit',
    'limit_trigger',
  ])
)(LimitEditor)
