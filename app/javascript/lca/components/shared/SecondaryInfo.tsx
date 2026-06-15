import type React from 'react'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
  },
}))

interface Props {
  children: React.ReactNode
}
const SecondaryInfo = ({ children }: Props) => {
  const classes = useStyles()
  return <span className={classes.root}>{children}</span>
}

export default SecondaryInfo
