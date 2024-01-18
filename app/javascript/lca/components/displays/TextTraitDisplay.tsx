import { Box, Typography } from '@mui/material'

import DisplayLabel from './DisplayLabel'

interface Props {
  label: string
  value: string
  extra?: number | string
}

const DisplayValueText = ({ label, value, extra }: Props) => {
  return (
    <Box sx={{ textAlign: 'left', alignSelf: 'start' }}>
      <DisplayLabel>{label}</DisplayLabel>

      <Box sx={{ textTransform: 'capitalize' }}>
        <Typography variant="h4" component="span" sx={{ fontSize: '1.75rem' }}>
          {value}
        </Typography>
        {extra && (
          <Typography
            variant="caption"
            component="span"
            sx={{ verticalAlign: 'top' }}
          >
            {' '}
            ({extra})
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default DisplayValueText
