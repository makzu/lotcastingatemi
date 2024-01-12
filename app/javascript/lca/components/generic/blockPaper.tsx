import * as React from 'react'

import { Theme, createStyles, withStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import { WithStyles } from '@mui/styles/withStyles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
      }),
      height: '100%',
      position: 'relative',
    },
  })

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode
}

const BlockPaper = (props: Props) => {
  const { classes, children } = props
  return <Paper className={classes.root}>{children}</Paper>
}

// @ts-expect-error withStyles HOC will go away in Material UI v5 migration
export default withStyles(styles)(BlockPaper)
