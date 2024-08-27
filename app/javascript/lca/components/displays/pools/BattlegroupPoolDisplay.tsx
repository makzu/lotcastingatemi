import { Box, type SxProps } from '@mui/material'

import PoolDisplayLabel from '@/components/displays/pools/DisplayLabel'
import PoolDisplayNumericValue from '@/components/displays/pools/PoolDisplayNumericValue'
import PoolDisplayStringValue from '@/components/displays/pools/PoolDisplayStringValue'

const BattlegroupPoolDisplay = (props: {
  label?: string
  value: number | string
  sx?: SxProps
}) => {
  const isString = typeof props.value === 'string'
  const ValueDisplay = isString
    ? PoolDisplayStringValue
    : PoolDisplayNumericValue

  return (
    <Box sx={{ minWidth: '4rem', ...props.sx }}>
      <PoolDisplayLabel>{props.label}</PoolDisplayLabel>
      <ValueDisplay>{props.value}</ValueDisplay>
    </Box>
  )
}

export default BattlegroupPoolDisplay
