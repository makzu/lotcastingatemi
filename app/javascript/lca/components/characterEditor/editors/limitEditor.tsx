import Typography from '@mui/material/Typography'

import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'
import { LIMIT_MAX } from 'utils/constants'
import type { Character } from '@/types'

interface Props {
  character: Character
  onChange: Function
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
        rows={2}
        maxRows={5}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default LimitEditor
