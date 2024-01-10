import * as React from 'react'
const { Component } = React
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
  },
})

class BlockPaper extends Component<{
  children: React.ReactNode
  classes: Record<string, $TSFixMe>
}> {
  render() {
    return (
      <Paper className={this.props.classes.root}>{this.props.children}</Paper>
    )
  }
}

export default withStyles(styles)(BlockPaper)
