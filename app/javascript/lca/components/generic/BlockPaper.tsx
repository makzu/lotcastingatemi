import type { ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 16,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: 16,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    height: '100%',
    position: 'relative',
  },
}))

interface BlockPaperProps {
  children: ReactNode
}
const BlockPaper = (props: BlockPaperProps) => {
  const classes = useStyles()
  return <Paper classes={classes}>{props.children}</Paper>
}

export default BlockPaper
