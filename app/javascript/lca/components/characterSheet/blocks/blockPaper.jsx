import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
  }
})

class BlockPaper extends React.PureComponent {
  render() {
    return <Paper className={ this.props.classes.root }>
      { this.props.children }
    </Paper>
  }
}
BlockPaper.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.array,
}

export default withStyles(styles)(BlockPaper)
