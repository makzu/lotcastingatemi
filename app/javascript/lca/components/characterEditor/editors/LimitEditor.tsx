// @flow
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { shouldUpdate } from 'recompose'

import BlockPaper from 'components/generic/BlockPaper.tsx'
import RatingField from 'components/generic/RatingField.tsx'
import TextField from 'components/generic/TextField.tsx'
import { LIMIT_MAX } from 'utils/constants.ts'
import { isUnequalByKeys } from 'utils'

import type { Character, Enhancer } from 'utils/flow-types'

type Props = {
  character: Character,
  onChange: Function,
}

function LimitEditor({ character, onChange }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Limit</Typography>

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
        minRows={2}
        maxRows={5}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, [
      'limit',
      'limit_trigger',
    ]),
)

export default enhance(LimitEditor)
