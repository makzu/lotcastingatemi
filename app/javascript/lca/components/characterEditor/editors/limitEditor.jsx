// @flow
import React from 'react'
import { shouldUpdate } from 'recompose'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { isUnequalByKeys } from 'utils'
import { LIMIT_MAX } from 'utils/constants.js'
import type { Character } from 'utils/flow-types'

function LimitEditor({
  character,
  onChange,
  onBlur,
  onRatingChange,
}: {
  character: Character,
  onChange: Function,
  onBlur: Function,
  onRatingChange: Function,
}) {
  return (
    <BlockPaper>
      <Typography variant="title">Limit</Typography>

      <RatingField
        trait="limit"
        value={character.limit}
        label="Current"
        max={LIMIT_MAX}
        onChange={onRatingChange}
        margin="dense"
      />
      <br />

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
        onBlur={onBlur}
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
