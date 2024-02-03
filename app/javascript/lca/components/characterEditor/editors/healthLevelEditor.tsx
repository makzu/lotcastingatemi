import { Box, Stack, Typography } from '@mui/material'

import HealthLevelBoxes from '@/components/generic/HealthLevelBoxes'
import RatingField from '@/components/generic/RatingField'
import BlockPaper from '@/components/shared/BlockPaper'
import type { Character } from '@/types'

interface Props {
  character: Character
  penalties: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
}

function HealthLevelEditor({ character, penalties, onChange }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Health</Typography>

      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <HealthLevelBoxes character={character} />
        <Typography>Current wound penalty: -{penalties.wound}</Typography>
      </Box>

      <Typography variant="subtitle1">Damage:</Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ mb: 1 }}>
        <RatingField
          trait="damage_bashing"
          value={character.damage_bashing}
          label="Bashing"
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="damage_lethal"
          value={character.damage_lethal}
          label="Lethal"
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="damage_aggravated"
          value={character.damage_aggravated}
          label="Aggravated"
          margin="dense"
          onChange={onChange}
        />
      </Stack>

      <Typography variant="subtitle1">Levels:</Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ mb: 1 }}>
        <RatingField
          trait="health_level_0s"
          value={character.health_level_0s}
          label="0"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_1s"
          value={character.health_level_1s}
          label="-1"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_2s"
          value={character.health_level_2s}
          label="-2"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_4s"
          value={character.health_level_4s}
          label="-4"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_incap"
          value={character.health_level_incap}
          label="Incap"
          narrow
          margin="dense"
          onChange={onChange}
        />
      </Stack>
    </BlockPaper>
  )
}

export default HealthLevelEditor
