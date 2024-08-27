import { Stack, type StackProps } from '@mui/material'

/** MUI Stack element with some defaults set for rows of dice pools */
const PoolStack = (props: StackProps) => {
  return <Stack direction="row" spacing={2} {...props} />
}

export default PoolStack
