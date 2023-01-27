import { ReactNode } from 'react'

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
  },
}))

interface Props {
  children: ReactNode
}
const SecondaryInfo = ({ children }: Props) => {
  const classes = useStyles()
  return <span className={classes.root}>{children}</span>
}

export default SecondaryInfo
