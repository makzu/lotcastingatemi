import { Typography } from '@mui/material'

import PoolDisplayLabel from '@/components/displays/DisplayLabel'

interface Props {
  label: string
  value: number | string
}

const BattlegroupPoolDisplay = (props: Props) => {
  const isString = typeof props.value === 'string'
  return (
    <div>
      <PoolDisplayLabel>{props.label}</PoolDisplayLabel>
      <Typography
        variant="body2"
        sx={{
          fontSize: isString ? '1rem' : '1.25rem',
          lineHeight: 'inherit',
          textTransform: 'capitalize',
        }}
      >
        {props.value}
      </Typography>
    </div>
  )
}

export default BattlegroupPoolDisplay
