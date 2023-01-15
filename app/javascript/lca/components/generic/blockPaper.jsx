// @flow
import * as React from 'react'
const { Component } = React

import withStyles from '@mui/styles/withStyles'
import Paper from '@mui/material/Paper'

const styles = (theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    height: '100%',
    position: 'relative',
  },
})

class BlockPaper extends Component<{ children: React.Node, classes: Object }> {
  render() {
    return (
      <Paper className={this.props.classes.root}>{this.props.children}</Paper>
    )
  }
}

export default withStyles(styles)(BlockPaper)
