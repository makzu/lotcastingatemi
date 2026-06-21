import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Character } from '@lca/types/character.ts'
import { LIMIT_MAX } from '@lca/utils/constants.ts'

type Props = {
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
        minRows={2}
        maxRows={5}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default LimitEditor
