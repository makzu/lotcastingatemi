import { Box, Typography } from '@mui/material'

import PoolDisplayLabel from './pools/DisplayLabel'

interface ResourceDisplayProps {
  label: string
  current: number
  total?: number
  committed?: number
}

const ResourceDisplay = ({
  label,
  current,
  total,
  committed,
}: ResourceDisplayProps) => (
  <div>
    <PoolDisplayLabel>{label}</PoolDisplayLabel>

    <Box sx={{ position: 'relative' }}>
      <Typography variant="h4" component="span">
        {current}
      </Typography>

      {total !== undefined && (
        <Typography
          variant="body1"
          component="span"
          sx={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: '0.125em',
          }}
        >
          /{total}
        </Typography>
      )}

      {(committed ?? 0) > 0 && (
        <Typography
          component="span"
          variant="caption"
          sx={{
            display: 'inline-block',
            position: 'absolute',
            bottom: '0.25em',
            right: '0.25em',
          }}
        >
          {committed}c
        </Typography>
      )}
    </Box>
  </div>
)

export default ResourceDisplay
